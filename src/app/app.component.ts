import { Component, ViewChild } from "@angular/core";
import { RestApiService } from "./service/rest-api.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";

export interface TableElement {
  id: string;
  name: string;
  email: string;
  website: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  Data: TableElement[];
  col: string[] = ["id", "name", "email", "website"];
  dataSource = new MatTableDataSource<TableElement>(this.Data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private restApiService: RestApiService) {
    this.restApiService.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<TableElement>(res);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }
}
