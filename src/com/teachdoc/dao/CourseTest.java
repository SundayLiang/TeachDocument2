package com.teachdoc.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class CourseTest extends Model<CourseTest>{

	public static final CourseTest dao=new CourseTest();
	public List searchByID(String id){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from test where id=? ");
		return Db.find(sql.toString(),id);
	}

	public List searchAll(String start,String length,String term){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.id,t.term,u.name as teachername,c.name as coursename,testdate,testplace,applydate,state,need_person,isArrToLab from test t "
				+ "left join user u on t.apply_teacher_id=u.id "
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
	
	public long pageCount(int items,String term){
		StringBuffer sql = new StringBuffer();
		long count;
		sql.append("select count(*) c from test where 1=1 ");
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
	
	public boolean updateTest(String course_id,String term,String testdate,String testplace,String week,String weekday,String starttime,String endtime){
		StringBuffer sql = new StringBuffer();    	
    	sql.append("update test "
    			+ "set testdate=?, testplace=?,week=?,weekday=?,starttime=?,endtime=?,state=? "
    			+ "where course_id=? and term=?"); 
		return Db.update(sql.toString(),testdate,testplace,week,weekday,starttime,endtime,"已审核",course_id,term)>0;
	}
	
	public boolean updatePerson(String id,String person_name){
		StringBuffer sql = new StringBuffer();    	
    	sql.append("update test set person_name=? where id=?"); 
		return Db.update(sql.toString(),person_name,id)>0;
	}
	
	public boolean insert(String course_id,String term,String apply_teacher_id,String usetime,String teststyle,String scale,ArrayList<String> list2,ArrayList<String> list3){
		
		//start by lfl
		String classes="",numberstu="",cAndp="";
		classes +=list2.get(0);
		numberstu +=list3.get(0);
		for(int i=1;i<list2.size();i++){
			classes+="、";
			numberstu+="、";
			classes += list2.get(i);
			numberstu +=list3.get(i);
		}
		//System.out.println(classes);											//test
		//sSystem.out.println(numberstu);											//test
		
		int c=list2.size();
		Double p=(double) 0;
		for(int i=0;i<c;i++){
			p+=Double.valueOf(list3.get(i));
		}
		cAndp = c+"/"+(int)Math.rint(p);
		
		int need_person = (int) Math.ceil(p/15);
		//System.out.println(Math.ceil(3.1));
		//end by lfl
		
		
		
		
		
		String sql="insert into test(course_id,term,apply_teacher_id,usetime,teststyle,scale," +
				"applydate,state,classes,numberstu,class_person,need_person) values(?,?,?,?,?,?,?,?,?,?,?,?)";
		
		return Db.update(sql.toString(),course_id,term,apply_teacher_id,usetime,teststyle,scale,(new Date()).toString(),"未审核",classes,numberstu,cAndp,need_person)>0;
	}

	public List searchTest(String course_id,String term){
		StringBuffer sql = new StringBuffer();    	
		sql.append("SELECT t.classes, t.class_person, t.testdate, t.`week`, t.weekday, t.usetime, t.state, t.teststyle, u.`name` AS teachername, t.id AS id FROM test AS t NATURAL JOIN `user` AS u WHERE t.course_id = ? AND t.term =?"); 
		return Db.find(sql.toString(),course_id,term);	
	}

	public List searchByCourse(){
		StringBuffer sql = new StringBuffer();
		sql.append("select distinct course_id,term,course.`name` AS course_name from test LEFT JOIN course ON course_id=course.id");
		
		return Db.find(sql.toString());
	}
}
