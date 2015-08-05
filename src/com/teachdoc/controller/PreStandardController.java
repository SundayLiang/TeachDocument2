package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.PreStandard;

public class PreStandardController extends Controller{

private Gson gson = new Gson();
	
	public void search(){
		HashMap jsonMap = new HashMap();
    	String id=getPara("id");
    	String courseNature=getPara("courseNature");
    	String name =getPara("name");
    	
    	List<Record> list= PreStandard.dao.search(id,name,courseNature);
    	renderJson(list);
	}
	
	public void insert(){
		String courseNature=getPara("courseNature");
    	String name =getPara("name");
    	
    	boolean bool=PreStandard.dao.insert(name,courseNature);
    	renderJson(bool);
	}
}
