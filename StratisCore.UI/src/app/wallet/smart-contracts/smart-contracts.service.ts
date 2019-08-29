import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Observable, of } from 'rxjs';

export class SmartContractsContractItem {
  constructor(
    public blockId: string, public type: string, public hash: string, public destinationAddress: string, public amount: number) { }
}

export class ContractTransactionItem {
  blockHeight: number;
  type: number;
  hash: string;
  to: string;
  amount: number;
  transactionFee: number;
  gasFee: number;
}

export abstract class SmartContractsServiceBase {
  GetReceipt(hash: string): Observable<string> { return of(); }
  GetReceiptSilent(hash: string): Observable<string> { return of(); }
  GetAddresses(walletName: string): Observable<string[]> { return of(); }
  GetBalance(walletName: string): Observable<number> { return of(); }
  GetAddressBalance(address: string): Observable<number> { return of(); }
  GetAddress(walletName: string): Observable<string> { return of(); }
  GetContracts(walletName: string): Observable<SmartContractsContractItem[]> { return of(); }
  GetSenderAddresses(walletName: string): Observable<string[]> { return of(); }
  GetParameterTypes(walletName: string): Observable<string[]> { return of(); }
  GetHistory(walletName: string, address: string): Observable<ContractTransactionItem[]> { return of(); }
  PostCreate(createTransaction: any): Observable<any> { return of(); }
  PostCall(createTransaction: any): Observable<any> { return of(); }
}

@Injectable()
export class SmartContractsService implements SmartContractsServiceBase {
  constructor(private apiService: ApiService) { }

  GetReceipt(hash: string): Observable<string> {
    return this.apiService.getReceipt(hash);
  }

  GetReceiptSilent(hash: string): Observable<string> {
    return this.apiService.getReceiptSilent(hash);
  }

  PostCall(createTransaction: any): Observable<any> {
    return this.apiService.postCallTransaction(createTransaction);
  }

  PostCreate(createTransaction: any): Observable<any> {
    return this.apiService.postCreateTransaction(createTransaction);
  }

  GetHistory(walletName: string, address: string): Observable<any> {
    return this.apiService.getAccountHistory(walletName, address);
  }

  GetBalance(walletName: string): Observable<any> {
    return this.apiService.getAccountBalance(walletName);
  }

  GetAddressBalance(address: string): Observable<any> {
    return this.apiService.getAddressBalance(address);
  }

  GetAddress(walletName: string): Observable<any> {
    return this.apiService.getAccountAddress(walletName);
  }

  GetAddresses(walletName: string): Observable<any> {
    return this.apiService.getAccountAddresses(walletName);
  }

  GetContracts(walletName: string): Observable<SmartContractsContractItem[]> {
    return of([
      new SmartContractsContractItem('7809', 'Transfer', 'bbdbcae72f1085710', 'SdrP9wvxZmaG7t3UAjxxyB6RNT9FV1Z2Sn', 10898025),
      new SmartContractsContractItem('7810', 'Transfer', 'bbdbcae72f1085710', 'SdrP9wvxZmaG7t3UAjxxyB6RNT9FV1Z2Sn', 11898025),
      new SmartContractsContractItem('7811', 'Transfer', 'bbdbcae72f1085710', 'SdrP9wvxZmaG7t3UAjxxyB6RNT9FV1Z2Sn', 12898025),
      new SmartContractsContractItem('7812', 'Transfer', 'bbdbcae72f1085710', 'SdrP9wvxZmaG7t3UAjxxyB6RNT9FV1Z2Sn', 13898025),
      new SmartContractsContractItem('7813', 'Transfer', 'bbdbcae72f1085710', 'SdrP9wvxZmaG7t3UAjxxyB6RNT9FV1Z2Sn', 14898025),
      new SmartContractsContractItem('7814', 'Transfer', 'bbdbcae72f1085710', 'SdrP9wvxZmaG7t3UAjxxyB6RNT9FV1Z2Sn', 15898025),
    ]);
  }

  GetSenderAddresses(walletName: string): Observable<string[]> {
    return of([
      'SarP7wvxZmaG7t1UAjaxyB6RNT9FV1Z2Sn',
      'SbrP8wvxZmaG7t2UAjbxyB7RNT9FV1Z2Sn',
      'ScrP9wvxZmaG7t3UAjcxyB8RNT9FV1Z2Sn'
    ]);
  }

  GetParameterTypes(walletName: string): Observable<string[]> {
    return of([
      'Type 1',
      'Type 2',
      'Type 3'
    ]);
  }
}
