package com.teachdoc.dao;

import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class TeachDocRecord extends Model<TeachDocRecord>{

	public static final TeachDocRecord dao= new TeachDocRecord();
	
	public List search(String id){
		
		StringBuffer sql = new StringBuffer();
		sql.append("select * from task_standard_record p "
				+ "where 1=1 ");
		if(id!=null && id.length()>0){
			sql.append(" and id = "+id);
		}	
		return Db.find(sql.toString());
	}
	
	public boolean Evaluate(String id,String score){
		String sql="update task_standard_record set check_result=?,check_time=? where id=?";
		return Db.update(sql.toString(),score,new Date(),id)>0;	
	}
}
