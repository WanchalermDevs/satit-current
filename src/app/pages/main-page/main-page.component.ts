import { AfterViewInit, Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ResizeService } from '../../resize/resize.service';
import { routerAnimation } from '../../utils/page.animation';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/users/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [routerAnimation]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  // Applying theme class
  @HostBinding('class.dark-theme') darkTheme = false;
  _sidenavMode = 'side';
  _boxedLayout = false;
  sideNavOpened = false;
  fullname: any;
  myPosition: any;

  // Data for messages at popup

  user_image: any;

  messages = [
    {
      subject: 'Monthly report',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'assets/avatars/4040.png',
      time: '18:05'
    },
    {
      subject: 'Holiday party',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'assets/avatars/4040.png',
      time: '3 hrs ago'
    },
    {
      subject: 'Salary bonus',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      image: 'assets/avatars/4040.png',
      time: '2 days ago'
    }
  ];


  constructor(public resizeService: ResizeService, private router: Router, private auth: AuthService) {
    this.onResize();
  }

  ngOnInit() {
    this.auth.getUserInfo(window.localStorage.getItem('token')).then((user) => {
      this.user_image = user['img_src'];
      this.myPosition = user['position'];
      this.fullname = user['prename'] + user['firstname'] + " " + user['lastname'];
    });
  }

  gotoDashboard() {
    this.router.navigateByUrl('/authorities/dashboard');
  }

  ngAfterViewInit(): void {
    // Resize after sidenav open on startup to draw charts correctly
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
    setTimeout(() => {
      // this.sideNavOpened = true
      this.sideNavOpened = false;
      this._sidenavMode = 'push';
    }, 0);
  }

  set sidenavMode(val) {
    this._sidenavMode = val;
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
  }

  get sidenavMode() {
    return this._sidenavMode;
  }

  set boxedLayout(val) {
    this._boxedLayout = val;
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
  }

  get boxedLayout() {
    return this._boxedLayout;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 800) {
      this.sideNavOpened = false;
      this._sidenavMode = 'over';
    }
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['./login']);
  }

}
