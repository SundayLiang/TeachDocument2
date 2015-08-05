package com.teachdoc.controller;

import java.io.File;
import java.util.List;

//import org.apache.catalina.connector.Request;

import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;
import com.teachdoc.dao.CalendarRecord;
import com.teachdoc.dao.OutlineCalRecord;
import com.teachdoc.dao.TeachDoc;
import com.teachdoc.dao.TeachDocRecord;
import com.teachdoc.dao.UpDocRecord;
import com.teachdoc.util.ExcelOperate;

public class UpDocController extends Controller{
	
	private final int MAXSize = 50 * 1024 * 1024;
    private String filedir="D://Teachdoc"+File.separator;
 
    public void UpDocs() {
    	String fileName="";
    	File file=null;
        try {
            List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
            for (UploadFile fileItem : upFiles) {
                  fileName=fileItem.getOriginalFileName();
                  file=fileItem.getFile();
            }
             
        } catch (Exception e) {
            e.printStackTrace();
        }
        String taskid= getPara("taskid");
        String standardid= getPara("standardid");
        String courseNature= getPara("courseNature");
        String dirs=getPara("url");        
 
    	String url="Document"+File.separator+dirs;
    	System.out.println(url);
    	boolean bool=UpDocRecord.dao.upDoc(filedir,url,fileName,file,taskid,standardid);
        renderJson(bool);
        
//        if(bool){
//        	String properties="CourseDoc/docdetail.html?taskID="+taskid+"&courseNature="+courseNature+"&dirs="+dirs;
//        	redirect("TeachDocument2/index.html?properties="+properties);
//        }
 
    }
    
    public void DownloadDocs(){
    	 String id= getPara("id");
    	 List<Record> list=TeachDocRecord.dao.search(id);
    	 if(list.size()>0){
    		 if(list.get(0).get("url")!=null){
    			 File file=new File(filedir+list.get(0).get("url"));
    	    	 if(file.exists()){
    	    		 renderFile(file);
    	    		 return;
    	    	 }
    		 }
    	 }
    	 renderJson(false);
    }
    
    public void UpOutlineCal() {
    	String fileName="";
    	File file=null;
        try{
            List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
            for (UploadFile fileItem : upFiles) {
                  fileName=fileItem.getOriginalFileName();
                  file=fileItem.getFile();
            }
             
        }catch (Exception e) {
            e.printStackTrace();
        }
        String courseid= getPara("courseid");
        String year= getPara("year");
        String dirs=getPara("url");        
 
    	String url="OutlineCal"+File.separator+dirs;
    	boolean bool=UpDocRecord.dao.upOutlineCal(filedir,url,fileName,file,courseid,year);
        renderJson(bool);
        
//        if(bool){
//        	String properties="CourseDoc/docdetail.html?taskID="+taskid+"&courseNature="+courseNature+"&dirs="+dirs;
//        	redirect("TeachDocument2/index.html?properties="+properties);
//        }
 
    }
    
    public void DownloadOutlineCal(){
   	 String id= getPara("id");
   	 List<Record> list=OutlineCalRecord.dao.search(id,null,null);
   	 if(list.size()>0){
   		 if(list.get(0).get("url")!=null){
   			 File file=new File(filedir+list.get(0).get("url"));
   	    	 if(file.exists()){
   	    		 renderFile(file);
   	    		 return;
   	    	 }
   		 }
   	 }
   	 renderJson(false);
   }
    
    
    public void UpCalendar() {
    	String fileName="";
    	File file=null;
        try {
            List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
            for (UploadFile fileItem : upFiles) {
                  fileName=fileItem.getOriginalFileName();
                  file=fileItem.getFile();
            }
             
        } catch (Exception e) {
            e.printStackTrace();
        }
        String taskid= getPara("taskid");
        String term= getPara("term");
        String dirs=getPara("url");        
 
    	String url="Calendar"+File.separator+dirs;
    	System.out.println(url);
    	boolean bool=UpDocRecord.dao.upCalendar(filedir,url,fileName,file,taskid,term);
        renderJson(bool);
        
//        if(bool){
//        	String properties="CourseDoc/docdetail.html?taskID="+taskid+"&courseNature="+courseNature+"&dirs="+dirs;
//        	redirect("TeachDocument2/index.html?properties="+properties);
//        }
 
    }
    
    public void DownloadCalendar(){
    	 String id= getPara("id");
    	 List<Record> list=CalendarRecord.dao.search(id);
    	 if(list.size()>0){
    		 if(list.get(0).get("url")!=null){
    			 File file=new File(filedir+list.get(0).get("url"));
    	    	 if(file.exists()){
    	    		 renderFile(file);
    	    		 return;
    	    	 }
    		 }
    	 }
    	 renderJson(false);
    }
    
    
    public void importExcel() {
    	
    	try {
    		String type="";
            List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
            for (UploadFile fileItem : upFiles) {           
                    File file =  fileItem.getFile();                   
                    ExcelOperate q=new ExcelOperate();
                    String[][] result = q.getData(file, 2);
                    int rowLength = result.length;
                    for(int i=0;i<rowLength;i++) {
//                        for(int j=0;j<result[i].length;j++) {
//                          System.out.println(result[i][7]+result[i][9]+" ");
//                        }
//                        System.out.println(result[i][1]+result[i][2]+ result[i][9]+result[i][10]);
                    	type+=result[i][7]=="ѧλ��"?"0":"1"+""+result[i][9]=="����"?"0":"1";
                    	if("ѧλ��".equals(result[i][7])){
                    		if("����".equals(result[i][9]))
                    			type="100";
                    		else
                    			type="101";
                    	}
                    	else{
                    			type="111";
                    	}
                        System.out.println(TeachDoc.dao.insert(result[i][1], result[i][2], type, result[i][9]));
                    }
                 }
             
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            renderJson("status", "0");//ʧ��
        }
        renderJson("status", "1");//�ɹ�
    }

}
