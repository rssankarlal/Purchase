import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource,MatTreeFlattener } from '@angular/material/tree';


interface FoodNode {
  name: string;
  url:string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Masters',
    url:'',
    children: [{name: 'Supplier' ,url:'/user/suppliers'},{name: 'Category' ,url:'/user/category'}, {name: 'Product',url:'/user/products'}, {name: 'Tax',url:'/user/tax'}],
  },
  {
    name: 'Transactions',
    url:'',
    children: [{name: 'Purchase',url:'/user/purchase'},{name: 'Goods Receipt',url:'/user/goodsreceipt'}],
      },
     
    
    
  // {
  //   name: 'Transactions',
  //   url:'',
  //   children: [
  //     {
  //       name: 'Green',
  //       url:'',
  //       children: [{name: 'Broccoli',url:''}, {name: 'Brussels sprouts',url:''}],
  //     },
  //     {
  //       name: 'Orange',
  //       url:'',
  //       children: [{name: 'Pumpkins',url:''}, {name: 'Carrots',url:''}],
  //     },
  //   ],
  // },
];



interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  url:string;
  level: number;
}


@Component({
  selector: 'app-navtree',
  templateUrl: './navtree.component.html',
  styleUrls: ['./navtree.component.css']
})
export class NavtreeComponent implements OnInit {
  item:any=[];

 
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url
    };
  };



  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
    
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);




  constructor() { 
    this.dataSource.data = TREE_DATA;
    this.item=[
      {
        "id": 2,
        "title": "node2",
        "nodrop": true,
        "nodes": [
          {
            "id": 21,
            "title": "node2.1",
            "nodes": []
          },
          {
            "id": 22,
            "title": "node2.2",
            "nodes": []
          }
        ]
      }
    ]

  }
 hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {
    
  }
  
  logNode(nodetest: any){
var ddd=nodetest;
    debugger;

  }


  

}
