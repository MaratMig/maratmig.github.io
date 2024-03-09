import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveData(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadData(key: string): Observable<any[]> {
    const dataString =  localStorage.getItem(key);
    return dataString ? of(JSON.parse(dataString)) : of([]);
  }

  deleteData(key: string): void {
    localStorage.removeItem(key);
  }
}
