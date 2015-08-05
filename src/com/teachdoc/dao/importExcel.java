package com.teachdoc.dao;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class importExcel extends Model<importExcel> {
	public static final importExcel dao = new importExcel();
	
	public int insertStuEva(String taskId, String score){
		System.out.println("getctid");
		String sql = "insert into import_stu_eva(task_id, score) values("+taskId+", "+score+")";
		return Db.update(sql);
	}

	public List getCtId(String teacherId, String courseId, String term) {
		System.out.println("getctid");
		String sql = "select ct.id from course_task ct where ct.teacher_id="
				+ teacherId + " and ct.course_Id=" + courseId+" and ct.term='"+term+"'";
		System.out.println(sql);
		return Db.find(sql);
	}
	
	public int insertPlan(String year, String url){
		return Db.update("insert into plan(plan_year, url) values('"+year+"','"+url+"');");
	}

}
