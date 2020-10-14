import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AddressBookComponent } from './address-book/address-book.component';
import { AddNewAddressComponent } from './address-book/modals/add-new-address/add-new-address.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { AboutComponent } from './advanced/components/about/about.component';
import { ExtPubkeyComponent } from './advanced/components/ext-pubkey/ext-pubkey.component';
import { GenerateAddressesComponent } from './advanced/components/generate-addresses/generate-addresses.component';
import { ResyncComponent } from './advanced/components/resync/resync.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { ReceiveComponent } from './receive/receive.component';
import { SendConfirmationComponent } from './send/send-confirmation/send-confirmation.component';
import { SendComponent } from './send/send.component';
import { SmartContractsModule } from './smart-contracts/smart-contracts.module';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { TokensModule } from './tokens/tokens.module';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { AccountSelectedGuard } from '@shared/guards/account-selected.guard';
import { TransactionsComponent } from './transactions/transactions.component';
import { WalletSelectorComponent } from './wallet-selector/wallet-selector.component';
import { SnackbarModule } from 'ngx-snackbar';
import { BlockExplorerComponent } from './block-explorer/block-explorer.component';
import { ColdStakingServiceBase, FakeColdStakingService } from './cold-staking/cold-staking.service';
import { ColdStakingOverviewComponent } from './cold-staking/components/overview/overview.component';
import { ColdStakingWalletComponent } from './cold-staking/components/overview/wallet/wallet.component';
import { ColdStakingCreateAddressComponent } from './cold-staking/components/modals/create-address/create-address.component';
import { ColdStakingWithdrawComponent } from './cold-staking/components/modals/withdraw/withdraw.component';
import { ColdStakingCreateComponent } from './cold-staking/components/modals/create/create.component';
import { ColdStakingCreateSuccessComponent } from './cold-staking/components/modals/create-success/create-success.component';
import { SideBarItemsProvider } from '@shared/components/side-bar/side-bar-items-provider.service';
import { SideBarItem, SimpleSideBarItem } from '@shared/components/side-bar/side-bar-item-base';
import { StakingSidebarItem } from './side-bar-items/staking-sidebar-item';
import { AddressBookCardComponent } from './address-book-card/address-book-card.component';
import { AddNodeComponent } from './advanced/components/add-node/add-node.component';
import { TransactionDetailsModalComponent } from './transaction-details-modal/transaction-details-modal.component';
import { AccountSidebarItem } from './side-bar-items/account-sidebar-item';
import { BroadcastTransactionComponent } from './advanced/components/broadcast-transaction/broadcast-transaction.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SwapComponent } from './swap/swap.component';
import { SwapConfirmationComponent } from './swap/swap-confirmation/swap-confirmation.component';
import { VoteComponent } from './vote/vote.component';
import { VoteModalComponent } from './vote/vote-modal/vote-modal.component';

@NgModule({
  imports: [
    SnackbarModule,
    SharedModule,
    WalletRoutingModule,
    SmartContractsModule.forRoot(),
    TokensModule,
    BsDatepickerModule.forRoot(),
    ScrollingModule
  ],
  declarations: [
    WalletComponent,
    DashboardComponent,
    SendComponent,
    ReceiveComponent,
    SendConfirmationComponent,
    TransactionDetailsComponent,
    LogoutConfirmationComponent,
    StatusBarComponent,
    AdvancedComponent,
    AddressBookComponent,
    AddNewAddressComponent,
    ExtPubkeyComponent,
    AboutComponent,
    GenerateAddressesComponent,
    ResyncComponent,
    TransactionsComponent,
    WalletSelectorComponent,
    BlockExplorerComponent,
    ColdStakingOverviewComponent,
    ColdStakingWalletComponent,
    ColdStakingCreateAddressComponent,
    ColdStakingWithdrawComponent,
    ColdStakingCreateComponent,
    ColdStakingCreateSuccessComponent,
    AddressBookCardComponent,
    AddNodeComponent,
    TransactionDetailsModalComponent,
    BroadcastTransactionComponent,
    SwapComponent,
    SwapConfirmationComponent,
    VoteComponent,
    VoteModalComponent
  ],
  providers: [
    AccountSelectedGuard,
    { provide: ColdStakingServiceBase, useClass: FakeColdStakingService },
    AccountSidebarItem,
    StakingSidebarItem
  ],
  entryComponents: [
    SendComponent,
    SendConfirmationComponent,
    SwapConfirmationComponent,
    ReceiveComponent,
    TransactionDetailsComponent,
    LogoutConfirmationComponent,
    AddNodeComponent,
    ResyncComponent,
    ColdStakingCreateAddressComponent,
    ColdStakingWithdrawComponent,
    ColdStakingCreateComponent,
    ColdStakingCreateSuccessComponent,
    BroadcastTransactionComponent,
    VoteModalComponent
  ]
})

export class WalletModule {
  constructor(private sidebarItems: SideBarItemsProvider,
              accountSidebarItem: AccountSidebarItem,
              stakingSidebarItem: StakingSidebarItem) {

    sidebarItems.registerSideBarItem(accountSidebarItem);

    sidebarItems.registerSideBarItem(new SimpleSideBarItem(
      'Send', '/wallet/send', ['side-bar-item-send']));

    sidebarItems.registerSideBarItem(new SimpleSideBarItem(
      'Receive', '/wallet/receive', ['side-bar-item-receive']));

    sidebarItems.registerSideBarItem(stakingSidebarItem);

    sidebarItems.registerSideBarItem(new SimpleSideBarItem(
      'Contacts', '/wallet/address-book', ['side-bar-item-address']));

    // sidebarItems.registerSideBarItem(new SimpleSideBarItem(
    //   'Explorer', '/wallet/explorer', ['side-bar-item-explorer']));

    sidebarItems.registerSideBarItem(new SimpleSideBarItem(
      'Advanced', '/wallet/advanced', ['side-bar-item-advanced']));

    sidebarItems.registerSideBarItem(new SimpleSideBarItem(
      'Vote', '/wallet/vote', ['side-bar-item-vote']
    ));

    sidebarItems.registerSideBarItem(new SimpleSideBarItem(
      'Token Swap', '/wallet/swap', ['side-bar-item-swap']
    ));

    sidebarItems.setSelected({
      route : '/wallet/dashboard'
    } as SideBarItem);
  }
}
