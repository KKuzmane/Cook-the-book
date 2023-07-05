import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  icons = [
    { src: 'assets/images/contactIcons/index.png', size: '50x50', link: 'categories' },
    { src: 'assets/images/contactIcons/facebook.png', size: '50x50', link: 'http://facebook.com/' },
    { src: 'assets/images/contactIcons/instagram.png', size: '50x50', link: 'http://instagram.com/' },
    { src: 'assets/images/contactIcons/twitter.png', size: '50x50', link: 'http://twitter.com/' },
    { src: 'assets/images/contactIcons/draugiem.png', size: '50x50', link: 'http://draugiem.lv/' },
    { src: 'assets/images/contactIcons/gmail.png', size: '50x50', link: 'http://gmail.com/' }
  ];

  constructor(private router: Router, private recipeService: RecipeService) { }

  login() {
    console.log('logged in');
  }

  handleIconClick(icon: any) {
    if (icon.link === 'recipe-category') {
      this.router.navigate(['/categories']);
    } else {
      window.open(icon.link, '_blank');
    }
  }

}
