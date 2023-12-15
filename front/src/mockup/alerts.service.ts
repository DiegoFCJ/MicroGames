import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import * as Messages from 'src/const-messages/messages'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  timerInterval: any = '';

  constructor() { }

  showAutoDestroyAlert(icon: any, title: string, text: string, timer: number) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: timer,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: Messages.DAMN_CAT[0],
      backdrop: Messages.DAMN_CAT[1],
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          const timer = popup.querySelector("b");
          if (timer) {
            this.timerInterval = setInterval(() => {
              const timerLeft = Swal.getTimerLeft();
              if (timerLeft !== null) {
                timer.textContent = `${timerLeft}`;
              }
            }, 100);
          }
        }
      },
      willClose: () => {
        clearInterval(this.timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }
/*
  showDynamicAlert(icon: any, title: string, text: string) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  }*/

  showErrorAlert(text: string) {
    return Swal.fire({
      icon: Messages.ICO_ERROR,
      title: Messages.TIT_ERROR,
      text: text,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: Messages.DAMN_CAT[0],
      backdrop: Messages.DAMN_CAT[1]
    });
  }

  showSuccessAlert(text: string) {
    return Swal.fire({
      icon: Messages.ICO_SUCCESS,
      title: Messages.TIT_SUCCESS,
      text: text,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: Messages.DAMN_CAT[0],
      backdrop: Messages.DAMN_CAT[1]
    });
  }

  showSuccessAlertWithTit(title: string, text: string) {
    return Swal.fire({
      icon: Messages.ICO_SUCCESS,
      title: title,
      text: text,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: Messages.DAMN_CAT[0],
      backdrop: Messages.DAMN_CAT[1]
    });
  }

  showInfoAlert(text: string) {
    return Swal.fire({
      icon: Messages.ICO_INFO,
      title: Messages.TIT_INFO,
      text: text,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: Messages.DAMN_CAT[0],
      backdrop: Messages.DAMN_CAT[1]
    });
  }

  showWarningAlert(text: string) {
    return Swal.fire({
      icon: Messages.ICO_WARNING,
      title: Messages.TIT_WARNING,
      text: text,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: Messages.DAMN_CAT[0],
      backdrop: Messages.DAMN_CAT[1]
    });
  }
}
