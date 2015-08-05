package com.teachdoc.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;
import com.teachdoc.dao.*;

public class evaluateTablesController extends Controller{
	private final int MAXSize = 50 * 1024 * 1024;
    private String filedir="D://evaluate"+File.separator;
    private Subject subject = SecurityUtils.getSubject();	
	private Session session = subject.getSession();
	private String userid=(String)session.getAttribute("login_account");
	public void insertStuEva(){
		int taskId = Integer.parseInt(getPara("taskId")); 
		int fromWhom = Integer.parseInt(getPara("fromWhom"));
		String isSame = getPara("isSame");
		String isStrict = getPara("isStrict");
		String isLawful = getPara("isLawful");
		String isFocus = getPara("isFocus");
		String isPowerful = getPara("isPowerful");
		
		int responsNum=evaluateTablesDao.dao.insertStuEva(taskId, isSame, isStrict, isLawful, isFocus, isPowerful, Integer.parseInt(userid));
		renderText(Integer.toString(responsNum));
	}
	
	
	
	public void updateStuEva(){
		int remarkId = Integer.parseInt(getPara("taskId")); 
		String isSame = getPara("isSame");
		String isStrict = getPara("isStrict");
		String isLawful = getPara("isLawful");
		String isFocus = getPara("isFocus");
		String isPowerful = getPara("isPowerful"); 
		int responsNum=evaluateTablesDao.dao.updateStuEva( isSame, isStrict, isLawful, isFocus, isPowerful,remarkId);
		renderText(Integer.toString(responsNum));
	}
	
	
	
	
	public void insertLeaderEva(){
		
		String fileLastName="";
    	File file=null;
        try {
            List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
            for (UploadFile fileItem : upFiles) {
            	fileLastName=fileItem.getOriginalFileName().substring(fileItem.getOriginalFileName().indexOf("."),fileItem.getOriginalFileName().length());
                  file=fileItem.getFile();
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
		int taskId = Integer.parseInt(getPara("taskId")); 
		String result = getPara("score"); 
		int fromWhom = Integer.parseInt(getPara("fromWhom"));
		String content=getPara("content");
		System.out.println(content);
		int responsNum=evaluateTablesDao.dao.insertLeaderEva(taskId, filedir, userid, fileLastName, file,  result, Integer.parseInt(userid));
		redirect("/evaluate/leaderEvaluate.html");
	}
	
	
	
	public void updateLeaderEva(){
		String fileLastName="";
    	File file=null;
    	List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
    	String oldcontent=getPara("oldcontent");
    	String a = getPara("task_Id");
    	System.out.println(a);
    	int remarkId = Integer.parseInt(a); 
		String result = getPara("score"); 
        try {
            
            
            if (upFiles.size()==0){
            	int responsNum=evaluateTablesDao.dao.updateLeaderEva(null,null,null,null,null, result, remarkId);
            	redirect("/evaluate/leaderEvaluate.html");
            	return;
            	
            }
            else{
            for (UploadFile fileItem : upFiles) {
            	fileLastName=fileItem.getOriginalFileName().substring(fileItem.getOriginalFileName().indexOf("."),fileItem.getOriginalFileName().length());
                  file=fileItem.getFile();
            }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        String url=userid;
        
		int responsNum=evaluateTablesDao.dao.updateLeaderEva(filedir,url,fileLastName, oldcontent,file, result, remarkId);
		redirect("/evaluate/leaderEvaluate.html");
	}
	
	
	
	 public void DownloadLeader(){
    	 String id= getPara("id");
    	 List<Record> list=evaluateTablesDao.dao.searchLeader(id ,null, null, null, null);
    	 if(list.size()>0){
    		 
    		 if(list.get(0).get("content")!=null){
    			 File file=new File(list.get(0).get("content").toString());
    	    	 if(file.exists()){
    	    		 renderFile(file);
    	    		 return;
    	    	 }
    		 }
    	 }
    	 renderJson(false);
    }
	 
	 
	 
	 public void DownloadSuper(){
    	 String id= getPara("id");
    	 List<Record> list=evaluateTablesDao.dao.searchSuper(id ,null, null, null, null);
    	 if(list.size()>0){
    		
    		 if(list.get(0).get("content")!=null){
    			 File file=new File(list.get(0).get("content").toString());
    	    	 if(file.exists()){
    	    		 renderFile(file);
    	    		 return;
    	    	 }
    		 }
    	 }
    	 renderJson(false);
    }

	
	public void insertSuperEva(){
		String fileLastName="";
    	File file=null;
        try {
            List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
            for (UploadFile fileItem : upFiles) {
            	fileLastName=fileItem.getOriginalFileName().substring(fileItem.getOriginalFileName().indexOf("."),fileItem.getOriginalFileName().length());
                  file=fileItem.getFile();
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
		int taskId = Integer.parseInt(getPara("taskId").toString()); 
		String result = getPara("score"); 
		int fromWhom = Integer.parseInt(getPara("fromWhom"));
		String url=userid;//用户ID
		int responsNum=evaluateTablesDao.dao.insertSuperEva(taskId, filedir, url, fileLastName, file,  result, Integer.parseInt(userid));
		redirect("/evaluate/supervisorEvaluate.html");
	}
	
	public void updateSuperEva(){
		String fileLastName="";
    	File file=null;
    	List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
    	String oldcontent=getPara("oldcontent");
    	int remarkId = Integer.parseInt(getPara("task_Id")); 
		String result = getPara("score"); 
        try {
            
            if (upFiles.size()==0){
            	int responsNum=evaluateTablesDao.dao.updateSuperEva(null,null,null,null,null, result, remarkId);
            	redirect("/evaluate/supervisorEvaluate.html");
            	return;
            	
            }
            else{
            for (UploadFile fileItem : upFiles) {
            	fileLastName=fileItem.getOriginalFileName().substring(fileItem.getOriginalFileName().indexOf("."),fileItem.getOriginalFileName().length());
                  file=fileItem.getFile();
            }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        String url=userid;//用户ID
		
		int responsNum=evaluateTablesDao.dao.updateSuperEva(filedir,url,fileLastName, oldcontent,file, result, remarkId);
		redirect("/evaluate/supervisorEvaluate.html");
	}
	
	public void dele(){
		String id = getPara("id");
		String role = getPara("wrole");
		String flag="no";
		if(evaluateTablesDao.dao.dele(id, role)!=0){
			flag="yes";
		}
		renderText(flag);
	}

}
