package com.teachdoc.dao;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class Course  extends Model<Course>{

	public static final Course dao=new Course();
	
	public List search(String start,String length){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from course t "
				+ "where 1=1 ");
//		if(term!=null && term.length()>0){
//			sql.append(" and t.term = '"+term+"'");
//		}
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
	
	public long pageCount(int items){
		StringBuffer sql = new StringBuffer();
		long count;
		sql.append("select count(*) c from course where 1=1 ");
//		if(term!=null && term.length()>0){
//			sql.append(" and term = '"+term+"'");
//		}
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
	
	public int insert(){
		return 0;
	}
			
}
