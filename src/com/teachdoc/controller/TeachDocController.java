package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.TeachDoc;

public class TeachDocController extends Controller{

	private Gson gson = new Gson();
	
	public void search(){
		HashMap jsonMap = new HashMap();
    	String term=getPara("term");
    	String start=getPara("start");
    	String length=getPara("length");
    	String name=getPara("name");
    	String id=getPara("id");
    	String accept=getPara("accept");
    	
    	List<Record> list=TeachDoc.dao.search(start,length,term);
    	jsonMap.put("rowList", list);
    	jsonMap.put("countPage",TeachDoc.dao.pageCount(20,term));
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	
	public void searchAllCourse(){
		HashMap jsonMap = new HashMap();
    	String term=getPara("term");
    	String start=getPara("start");
    	String length=getPara("length");
    	String name=getPara("name");
    	String id=getPara("id");
    	String accept=getPara("accept");
    	
    	List<Record> list=TeachDoc.dao.searchAllCourse(start, length,term);
    	jsonMap.put("rowList", list);
    	jsonMap.put("countPage",TeachDoc.dao.pageCountAllCourse(20,term));
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	
	public void upLoadDoc(){
		
	}
	
}
