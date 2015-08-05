package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.Course;

public class CourseController extends Controller{

	private Gson gson = new Gson();
	
	public void search(){
		HashMap jsonMap = new HashMap();
    	String start=getPara("start");
    	String length=getPara("length");
    	List<Record> list=Course.dao.search(start,length);
    	jsonMap.put("rowList", list);
    	jsonMap.put("countPage",Course.dao.pageCount(20));
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	
	public void searchAll(){
		List<Record> list=Course.dao.search(null,null);
		renderJson(list);
	}
}
