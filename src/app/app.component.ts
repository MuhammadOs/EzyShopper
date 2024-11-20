// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']})
export class AppComponent {
  title = "E-commerce";
}
