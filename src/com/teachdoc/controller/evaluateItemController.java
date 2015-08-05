package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.teachdoc.dao.evaluateItemDao;
import com.jfinal.plugin.activerecord.Record;

public class evaluateItemController extends Controller{
	private Gson gson = new Gson();
	
	public void search(){
		Subject subject = SecurityUtils.getSubject();	
		Session session = subject.getSession();
		String userid=(String)session.getAttribute("login_account");
		HashMap jsonMap=new HashMap();
		String id=getPara("taskId"); 
		String teacherId=getPara("teacherId");
		String outlineId=getPara("outlineId"); 
		String term=getPara("term"); 
		String start=getPara("start"); 
		String length=getPara("length");
		String courseId=getPara("courseId");
		String whatRole=getPara("whatRole");
		System.out.println(whatRole);
		if(subject.isPermitted("1")||subject.isPermitted("23")||subject.isPermitted("24")){
			List<Record> list=evaluateItemDao.dao.search(id, teacherId, outlineId, term, courseId, start, "20", whatRole);
			jsonMap.put("resultList", list);
			jsonMap.put("pageCount", evaluateItemDao.dao.pageCount(20, id, teacherId, outlineId, term, courseId, whatRole));
			
			String json = gson.toJson(jsonMap);
	//		System.out.println(json);
			renderJson(json);
		}
		else{
			List<Record> list=evaluateItemDao.dao.search(id, userid, outlineId, term, courseId, start, "20", whatRole);
			jsonMap.put("resultList", list);
			jsonMap.put("pageCount", evaluateItemDao.dao.pageCount(20, id, userid, outlineId, term, courseId, whatRole));
			
			String json = gson.toJson(jsonMap);
//			System.out.println(json);
			renderJson(json);
		}
	}
	
	
	public void searchAllRemark(){
		HashMap jsonMap=new HashMap();
		String taskId=getPara("taskId");
		String evaRole=getPara("evaRole");
		String start=getPara("start"); 
		List<Record> list=evaluateItemDao.dao.searchAllRemark(taskId, evaRole, start);
		jsonMap.put("resultList", list);
		jsonMap.put("pageCount", evaluateItemDao.dao.pageCountR(5, taskId, evaRole));
		
		String json = gson.toJson(jsonMap);
//		System.out.println(json);
		renderJson(json);
	}
	
	
	public void searchOne(){
		HashMap jsonMap=new HashMap();
		String id=getPara("taskId");
		String whatRole=getPara("whatRole");
		System.out.println(whatRole);
		List<Record> list = evaluateItemDao.dao.search(id, "all", null, "all", "all", "0", "20", whatRole);
		jsonMap.put("resultlist", list);
		String json = gson.toJson(jsonMap);
		System.out.println(json.toString());
		renderJson(json);
	}
	public void searchTermLine(){
		HashMap jsonMap=new HashMap();
		List<Record> list = evaluateItemDao.dao.searchTermLine();
		jsonMap.put("termlist", list);
		String json = gson.toJson(jsonMap);
//		System.out.println(json);
		renderJson(json);
	}
	public void searchTeacherLine(){
		HashMap jsonMap=new HashMap();
		List<Record> list = evaluateItemDao.dao.searchTeacherLine();
		jsonMap.put("teacherlist", list);
		String json = gson.toJson(jsonMap);
		renderJson(json);
		
	}
	public void searchCourseLine(){
		HashMap jsonMap=new HashMap();
		List<Record> list = evaluateItemDao.dao.searchCourseLine();
		jsonMap.put("courselist", list);
		String json = gson.toJson(jsonMap);
		renderJson(json);
		
	}
}
