import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Animations } from '@shared/animations/animations';
import { VoteRequest } from '@shared/models/vote-request';
import { WalletInfoRequest } from '@shared/models/wallet-info';
import { ApiService } from '@shared/services/api.service';
import { GlobalService } from '@shared/services/global.service';
import { GeneralInfo } from '@shared/services/interfaces/api.i';
import { NodeService } from '@shared/services/node-service';
import { WalletService } from '@shared/services/wallet.service';
import { ElectronService } from 'ngx-electron';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VoteModalComponent } from './vote-modal/vote-modal.component';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  animations: Animations.fadeIn
})
export class VoteComponent implements OnInit, OnDestroy {

  public testnetEnabled = false;
  public noBalance: boolean;
  public isVoting = false;
  public hasVoted = false;
  public voteResult: string;
  private walletInfoRequest: WalletInfoRequest;
  public maxAmount: number;
  public fee: number;
  public voteForm: FormGroup;
  private formValueChanges$: Subscription;
  private maximumBalanceSubscription: Subscription;
  public apiError: string;
  public generalInfo: Observable<GeneralInfo>;
  public isSynced = false;

  constructor(private apiService: ApiService, public globalService: GlobalService, private fb: FormBuilder, private walletService: WalletService, private modalService: NgbModal, private nodeService: NodeService, private electronService: ElectronService) {
    this.testnetEnabled = globalService.getTestnetEnabled();
    this.buildVoteForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('hasVoted') === "true") {
      this.hasVoted = true;
      this.voteResult = localStorage.getItem('voteResult');
    } else {
      this.hasVoted = false;
      this.voteResult = "false";
    }

    this.generalInfo = this.nodeService.generalInfo()
      .pipe(tap(
        response => {
          if (response.percentSynced === 100) {
            this.isSynced = true;
            this.cancelSubscriptions();
            this.getMaximumAmount();
          } else {
            this.isSynced = false;
            this.cancelSubscriptions();
            this.getMaximumAmount();
          }
        }));
  }

  ngOnDestroy(): void {
    this.cancelSubscriptions();
  }

  private getMaximumAmount(): void {
    this.walletInfoRequest = new WalletInfoRequest(this.globalService.getWalletName(), 0, "low");
    this.maximumBalanceSubscription = this.apiService.getMaximumBalance(this.walletInfoRequest)
      .subscribe(
        response => {
          this.maxAmount = response.maxSpendableAmount;
          if (this.maxAmount < 1) {
            this.noBalance = true;
          } else {
            this.noBalance = false;
          }
        },
        () => {
          this.cancelSubscriptions();
        }
      )
    ;
  }

  public vote(): void {
    let voteToBoolean;
    if (this.voteForm.get('vote').value === "Yes") {
      voteToBoolean = true;
    } else {
      voteToBoolean = false;
    }

    const voteRequest = new VoteRequest(this.globalService.getWalletName(), this.voteForm.get('walletPassword').value, voteToBoolean)

    this.isVoting = true;
    const modal = this.modalService.open(VoteModalComponent, {
      backdrop: 'static',
    });
    const modalInstance = modal.componentInstance;
    modalInstance.title=`<div class="text-center">Issuing your vote</div>`;
    modalInstance.body=`<div class="text-center">Your voting decision is being recorded on-chain. This may take some time to complete. Please do not close the wallet until you receive confirmation that your vote has been submitted.</div>`;
    this.walletService.vote(voteRequest).toPromise()
      .then(() => {
        this.isVoting = false;
        this.hasVoted = true;
        localStorage.setItem('hasVoted', "true");
        localStorage.setItem('voteResult', voteToBoolean);
        modalInstance.loading = false;
        modalInstance.title = `<div class="text-center">Vote submitted</div>`;
        modalInstance.body = `<div class="text-center">You have succesfully submitted your vote.</div>`;
        this.voteResult = localStorage.getItem('voteResult');
        this.voteForm.reset();
      }).catch(error => {
        this.isVoting = false;
        this.hasVoted = false;
        this.apiError = error.error.errors[0].message;
        modalInstance.loading = false;
        modalInstance.title = `<div class="text-center">Failed to submit your vote</div>`;
        modalInstance.body = `<div class="text-center">Something went wrong while issuing your vote.<br>${this.apiError}</div>`;
        this.voteForm.reset();
    })
  }

  public openProposal(): void {
    this.electronService.shell.openExternal('https://www.stratisplatform.com/2020/09/25/introducing-strax/');
  }

  private buildVoteForm(): void {
    this.voteForm = this.fb.group({
      vote: ['', Validators.required],
      walletPassword: ['', Validators.required]
    });

    this.formValueChanges$ = this.voteForm.valueChanges
      .subscribe(() => this.onValueChanged());
  }

  onValueChanged(): void {
    if (!this.voteForm) { return; }
    const form = this.voteForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.swapValidationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    vote: '',
    walletPassword: '',
  };

  swapValidationMessages = {
    vote: {
      required: 'Your vote is required.'
    },
    walletPassword: {
      required: 'Your password is required.'
    }
  };

  private cancelSubscriptions(): void {
    if (this.maximumBalanceSubscription) {
      this.maximumBalanceSubscription.unsubscribe();
    }
  }
}