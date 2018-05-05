import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
// Service
import {ActivityChatService} from './service/activity-chat.service';
import {Message} from './models/Message';
import {FormBuilder, NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {DataProcessingService} from '../../shared/services/data-processing.service';
import {Hotel} from '../../hotels/interfaces/hotel';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {Bill} from "../../upload/interfaces/bill";
import {Observable} from "rxjs/Observable";
import {NgxAutoScroll} from "ngx-auto-scroll";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-activity-chat',
  templateUrl: './activity-chat.component.html',
  styleUrls: ['./activity-chat.component.scss']
})
export class ActivityChatComponent implements OnInit{

  // Bug with scrollDown

  // @ViewChild('scroller') private feedContainer: ElementRef;
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

  messages: any;
  text: string;
  author: string;
  date: string;
  hotelId: any;
  managerId: any;
  objectOfMAnager: any;
  hotel: Observable<Hotel>;

  constructor(private chatService: ActivityChatService,
              public dataProcessingService: DataProcessingService,
              public dataStorage: DataStorageService,
              private afs: AngularFirestore,
              private formBuilder: FormBuilder) {
    IntervalObservable.create(200).subscribe(() => {

    });
  }

  onKey(form: NgForm): void {
    this.hotelId = localStorage.hotelId;
    this.managerId = localStorage.user;
    this.objectOfMAnager = this.dataStorage.getUser();
    form.value.managerId = this.objectOfMAnager.name;
    form.value.htId = this.hotelId;
    // console.log(form.value);
    this.chatService.sendMessage(form.value);
    console.log(form.value);
    // AddVendors
    form.resetForm();
  }

  ngOnInit() {
    this.messages = this.chatService.getMessages();
  }

  public forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }

  // ngAfterViewChecked():void{
  //   this.feedContainer.nativeElement.scrollTop =
  //     this.feedContainer.nativeElement.scrollHeight;
  // }
}
