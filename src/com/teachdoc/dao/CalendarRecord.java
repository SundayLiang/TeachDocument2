package com.teachdoc.dao;

import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class CalendarRecord extends Model<CalendarRecord>{

	public static final CalendarRecord dao= new CalendarRecord();
	
	 public List searchCalendarByTaskId(String taskid,String term){
	    	
	    	StringBuffer sql = new StringBuffer();    	
	    	sql.append("select * from calendar_record where task_id=? and term=?"); 
			return Db.find(sql.toString(),taskid,term);
	    }
	
	public boolean Evaluate(String id,String score){
		String sql="update calendar_record set check_result=?,check_time=? where id=?";
		return Db.update(sql.toString(),score,new Date(),id)>0;	
	}

	public List<Record> search(String id) {			
			StringBuffer sql = new StringBuffer();
			sql.append("select * from calendar_record  "
					+ "where 1=1 ");
			if(id!=null && id.length()>0){
				sql.append(" and id = "+id);
			}	
			return Db.find(sql.toString());
	}
}
