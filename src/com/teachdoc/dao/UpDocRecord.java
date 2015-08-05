package com.teachdoc.dao;

import java.io.File;
import java.util.Date;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class UpDocRecord extends Model<UpDocRecord>{
	public static final UpDocRecord dao=new UpDocRecord();

	public boolean upDoc(String filedir,String path, String fileName, File file,String taskid,String standardid) {			
		File f =new File(filedir+path);
		if (!f.exists()  && !f.isDirectory()){       
		    f.mkdirs();    
		}
		File fi=new File(filedir+path+fileName);
		if(!fi.exists()){
			file.renameTo(fi);
		}
		else{
			System.out.println("文件已存在");
			return false;
		}

		String sql="insert into task_standard_record(task_id,standard_id,url,filename,submit_time) values(?,?,?,?,?)";
		return Db.update(sql.toString(),taskid,standardid,path+file.getName(),file.getName(),new Date())>0;		
	}
	
	public boolean upOutlineCal(String filedir,String path, String fileName, File file,String courseid,String year) {			
		File f =new File(filedir+path);
		if (!f.exists()  && !f.isDirectory()){       
		    f.mkdirs();    
		}
		File fi=new File(filedir+path+fileName);
		if(!fi.exists()){
			file.renameTo(fi);
		}
		else{
			System.out.println("文件已存在");
			return false;
		}

		String sql="insert into outline_cal_record(course_id,year,url,filename,submit_time) values(?,?,?,?,?)";
		return Db.update(sql.toString(),courseid,year,path+file.getName(),file.getName(),new Date())>0;		
	}

	public boolean upCalendar(String filedir, String path, String fileName,File file, String taskid, String term) {
		File f =new File(filedir+path);
		if (!f.exists()  && !f.isDirectory()){       
		    f.mkdirs();    
		}
		File fi=new File(filedir+path+fileName);
		if(!fi.exists()){
			file.renameTo(fi);
		}
		else{
			System.out.println("文件已存在");
			return false;
		}

		String sql="insert into calendar_record(task_id,term,url,filename,submit_time) values(?,?,?,?,?)";
		return Db.update(sql.toString(),taskid,term,path+file.getName(),file.getName(),new Date())>0;	
	}
}
