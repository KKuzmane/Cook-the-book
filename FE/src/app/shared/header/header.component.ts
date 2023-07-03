import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  buttons = [
    { label: 'Button 1', link: '/button1' },
    { label: 'Button 2', link: '/button2' },
    // Add more buttons as needed
  ];
}
