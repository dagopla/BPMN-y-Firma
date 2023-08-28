import {

  Component,

  ElementRef,

  OnInit,
  ViewChild,
} from '@angular/core';

import BpmnJS from 'bpmn-js/lib/NavigatedViewer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bpmn',
  templateUrl: './bpmn.component.html',
  styleUrls: ['./bpmn.component.scss'],
})
export class BpmnComponent implements OnInit {
  @ViewChild('bpmnContainer') bpmnContainer!: ElementRef;
  bpmnViewer!: BpmnJS;

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.bpmnViewer = new BpmnJS({
      container: document.getElementById('bpmnContainer') as HTMLElement,
    });
    this.http.get('../../assets/example.bpmn',{responseType:'text'}).subscribe((xml)=>{
      this.viewerImport(xml)
    });
    // Replace 'path-to-your-bpmn-file.bpmn' with the actual path to your BPMN file
    // this.viewerImport();
  }
  async viewerImport(xml:any){
    try{
      const{warnings}=await this.bpmnViewer.importXML(xml);  
      console.log('rendered',warnings);
      
    }catch(err){
      console.error('Error rendering BPMN:', err);
    }
  }
}
