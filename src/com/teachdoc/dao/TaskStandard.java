package com.teachdoc.dao;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class TaskStandard extends Model<TaskStandard>{

    public static final TaskStandard dao= new TaskStandard();
    
    public List searchStandardByTaskId(String taskid,String courseNature){
    	
    	StringBuffer sql = new StringBuffer();    	
    	sql.append("select s.id as standardid,s.doc_name,s.course_nature,s.deadline,s.weight,tsr.id as recordid,"
    			+ "tsr.filename,tsr.submit_time,tsr.url,tsr.check_time,tsr.check_result from standard s LEFT JOIN task_standard_record tsr ON "
    			+ "s.id=tsr.standard_id and tsr.task_id=? WHERE course_nature=?"); 
		return Db.find(sql.toString(),taskid,courseNature);
    }

	public List<Record> searchAll() {
		StringBuffer sql = new StringBuffer();    	
    	sql.append("select doc_name,deadline from standard group by doc_name;"); 
		return Db.find(sql.toString());
	}
	
	public boolean updateStandard(String doc_name,String deadline){
		StringBuffer sql = new StringBuffer();    	
    	sql.append("update standard set deadline=? where doc_name=?"); 
		return Db.update(sql.toString(),deadline,doc_name)>0;
	}
}
