package com.teachdoc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.CourseTest;
import com.teachdoc.dao.TeachDoc;
import com.teachdoc.util.*;

public class CourseTestController extends Controller{
	private Gson gson = new Gson();

	/*
	 * 教学办审核查询
	 */
	public void searchAll(){
		HashMap jsonMap = new HashMap();
		String start=getPara("start");
		String term=getPara("term");
		List<Record> list=CourseTest.dao.searchAll(start,"20",term);
    	jsonMap.put("rowList", list);
    	jsonMap.put("countPage",CourseTest.dao.pageCount(20,term));
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	/*
	 * 教学办审核
	 */
	public void updateTest(){
		String course_id=getPara("course_id");
		String term = getPara("term");
		String testdate=getPara("testdate");
		String testplace=getPara("testplace");
		String week=getPara("week");
		String weekday=getPara("weekday");
		String starttime=getPara("starttime");
		String endtime=getPara("endtime");
		
		System.out.println(course_id+term+testdate+testplace+week+weekday+starttime+endtime);
		
		boolean bool=CourseTest.dao.updateTest(course_id,term, testdate, testplace,week,weekday,starttime,endtime);
		renderJson(bool);
	}
	
	/*
	 * 监考人员配备
	 */
	public void updatePerson(){
		String id=getPara("id");
		String person_name=getPara("person_name");
		boolean bool=CourseTest.dao.updatePerson(id, person_name);
		renderJson(bool);
	}
	
	public void downLoadPdf(){
		String id=getPara("id");
		HttpServletResponse response=getResponse();
		response.setContentType("application/pdf");
		if(id!=null){
			try {
			  response.setHeader("Content-Disposition", "attachment;filename="+java.net.URLEncoder.encode("考试申请表.pdf", "UTF-8"));
			  new PdfProducer().makeEnrollPDF(getRequest().getRealPath("/")+"ireport/testdemo.jasper", response.getOutputStream(), id);
		    } catch (Exception e) {}
		}
		renderNull();
	}
	
	//搜索本学期相同科目的所有考试
	public void searchTest(){
		HashMap jsonMap = new HashMap();
		String course_id=getPara("course_id");
		String term=getPara("term");	
		List<Record> lists=CourseTest.dao.searchTest(course_id, term);		
		
		String classes=null,usetime=null,teststyle=null,state=null,teachername=null;
		int totalnum=0,id;

		List<HashMap> rowList = new ArrayList<HashMap>();
		for(int i=1;i<lists.size();i++){
			classes=lists.get(i).get("classes").toString();
			System.out.println(classes);
			usetime=lists.get(i).get("usetime").toString();
			teststyle=lists.get(i).get("teststyle").toString();
			state=lists.get(i).get("state").toString();
			teachername=lists.get(i).get("teachername").toString();
			id=lists.get(i).get("id");
			totalnum = Integer.valueOf((lists.get(i).get("class_person").toString().split("/"))[1]);
			System.out.println(totalnum);																//test
			
			HashMap map = new HashMap();
			map.put("classes", classes);
			map.put("usetime",usetime);
			map.put("teststyle", teststyle);
			map.put("totalnum", totalnum);
			map.put("state", state);
			map.put("teachername", teachername);
			map.put("id", id);
			rowList.add(map);
		}	
		
		jsonMap.put("rowList", rowList);
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	
	public void insert(){

		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		String course_id=getPara("course_id");
		String term=getPara("term");
		String teachername=getPara("teachername");
		String plantime=getPara("plantime");
		String classtime=getPara("classtime"); 			
		String usetime=getPara("usetime");
		String teststyle=getPara("teststyle");
		String scale=getPara("scale");
		
		//start by lfl
		
		String amountstu=getPara("amountstu");
		//System.out.println(amountstu);											//test
		String list1[] = amountstu.split("、");//将班级分开
//		for(int k=0;k<list1.length;k++){										//test
//			System.out.println(list1[k]);
//		}
		//String list2[] = null,list3[] = null;
		ArrayList<String> list2 = new ArrayList<String>(),list3 = new ArrayList<String>();
		for(int i=0;i<list1.length;i++){
			String list0[] = list1[i].split("-");//将班级和人数分开
			list2.add(list0[0]);
			list3.add(list0[1]);
		}
//		for(int k=0;k<list1.length;k++){										//test
//			System.out.println(list2.get(k));
//			System.out.println(list3.get(k));
//		}
		
		//end by lfl   
		
		String apply_teacher_id=(String)session.getAttribute("login_account");
		boolean bool=CourseTest.dao.insert(course_id, term, apply_teacher_id, usetime, teststyle, scale,list2,list3);
		renderJson(bool);
	}

	public void searchByCourse(){
		HashMap jsonMap = new HashMap();
		List<Record> rowList = CourseTest.dao.searchByCourse();
//		for(int i=0;i<rowList.size();i++){													//test
//			System.out.println(rowList.get(i).get("id"));
//		}
		
		jsonMap.put("rowList",rowList);
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	
	
}
