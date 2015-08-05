package com.teachdoc.dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class TeachDoc extends Model<TeachDoc>{
	
	public static final TeachDoc dao=new TeachDoc();
	
	public List search(String start,String length,String term){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.term,t.id,t.teacher_id,t.course_id,u.name as teacher_name,c.id as courseNumber,c.name as courseName,t.score,c.nature,c.test_method from course_task t "
				+ "left join user u on t.teacher_id=u.id "
				+ "left join course c on t.course_id=c.id "
				+ "where 1=1 ");
		if(term!=null && term.length()>0){
			sql.append(" and t.term = '"+term+"'");
		}
//		if(name!=null && name.trim().toString().length()>0){
//			sql.append(" and AssistantName like '%"+name+"%'");
//		}
//		if(band !=null && band.length()>0){
//			sql.append(" and AssistantBand <= "+band);
//		}
//		if(num !=null && num.trim().length()>0){
//			sql.append(" and ProjectNum <"+num);
//		}
		if(start!=null && length!=null &&start.length()>0 && length.length()>0){
			sql.append(" ORDER BY t.id limit ");
			sql.append(start);
			sql.append(",");
			sql.append(length);
		}
		return Db.find(sql.toString());		
	}
	
	public List searchAllCourse(String start,String length,String term){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT t.term,t.courseNature,t.courseNumber,t.courseName from teachdoc t where 1=1 ");
		if(term!=null && term.length()>0){
			sql.append(" and t.term = '"+term+"'");
		}
//		if(name!=null && name.trim().toString().length()>0){
//			sql.append(" and AssistantName like '%"+name+"%'");
//		}
//		if(band !=null && band.length()>0){
//			sql.append(" and AssistantBand <= "+band);
//		}
//		if(num !=null && num.trim().length()>0){
//			sql.append(" and ProjectNum <"+num);
//		}
		
		sql.append("  GROUP BY courseNumber ");
		
		if(start!=null && length!=null &&start.length()>0 && length.length()>0){
			sql.append(" ORDER BY t.ID limit ");
			sql.append(start);
			sql.append(",");
			sql.append(length);
		}
		return Db.find(sql.toString());		
	}
	
	public long pageCount(int items,String term){
		StringBuffer sql = new StringBuffer();
		long count;
		sql.append("select count(*) c from course_task where 1=1 ");
		if(term!=null && term.length()>0){
			sql.append(" and term = '"+term+"'");
		}
//		if(name!=null && name.trim().toString().length()>0){
//			sql.append(" and AssistantName like '%"+name+"%'");
//		}
		
		List<Record> list=Db.find(sql.toString());
		if (list == null || list.size() == 0) {
			count = 0;
		}
		else {
			Record record = list.get(0);
			count = record.getLong("c");
		}
		long length=count % items == 0 ? count/items:count/items+1;
		return length;
	}
	
	
	public long pageCountAllCourse(int items,String term){
		StringBuffer sql = new StringBuffer();
		long count;
		sql.append("select count(*) c from teachdoc where 1=1  ");
		if(term!=null && term.length()>0){
			sql.append(" and t.term = '"+term+"'");
		}
	
		sql.append("  GROUP BY courseNumber "); 
				
		List<Record> list=Db.find(sql.toString());
		if (list == null || list.size() == 0) {
			count = 0;
		}
		else {
			Record record = list.get(0);
			count = record.getLong("c");
		}
		long length=count % items == 0 ? count/items:count/items+1;
		return length;
	}
	
	
	public boolean insert(String courseNumber,String courseName,String courseNature,String classes){
		if(courseNumber!=null){
			String sql="insert into teachdoc(userID,courseNumber,courseName," +
					"term,courseNature,p_audit,m_audit,a_audit,class,grade) values(?,?,?,?,?,0,0,0,?,0)";
			return Db.update(sql.toString(),"1",courseNumber,courseName,"2014-2015-1",courseNature,classes)>0;
		}
		return false;	
	}
	


	public List searchTest(String course_id, String term) {
		StringBuffer sql = new StringBuffer();    	
		sql.append("select u.name as teachername,c.name as coursename,c.totle_time as plantime,t.weeks as classtime from course_task t "
				+ "left join user u on t.teacher_id=u.id "
				+ "left join course c on t.course_id=c.id where t.term=? and t.course_id=?"); 
		return Db.find(sql.toString(),term,course_id);	
	}

}
