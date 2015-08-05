package com.teachdoc.dao;

import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class OutlineCalRecord extends Model<OutlineCalRecord>{
	
	public static final OutlineCalRecord dao=new OutlineCalRecord();
	
    public List search(String id,String year,String courseid){
		
		StringBuffer sql = new StringBuffer();
		sql.append("select * from outline_cal_record t "
				+ "where 1=1 ");
		if(id!=null && id.length()>0){
			sql.append(" and id = "+id);
		}
		if(year!=null && year.length()>0){
			sql.append(" and t.year = '"+year+"'");
		}
		if(courseid!=null && courseid.length()>0){
			sql.append(" and t.courseid = '"+courseid+"'");
		}
		return Db.find(sql.toString());
	}
	
	public boolean Evaluate(String id,String score){
		String sql="update outline_cal_record set check_result=?,check_time=? where id=?";
		return Db.update(sql.toString(),score,new Date(),id)>0;	
	}

}
