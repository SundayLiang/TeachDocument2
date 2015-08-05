package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.TeachDocRecord;;

public class TeachDocRecordController extends Controller{

private Gson gson = new Gson();
	
	public void search(){
//		HashMap jsonMap = new HashMap();
//    	String id=getPara("id");
//    	String courseNature=getPara("courseNature");
//    	String name =getPara("name");
//    	
//    	List<Record> list= PreStandard.dao.search(id,name,courseNature);
//    	renderJson(list);
		
		
	}
	
	public void Evaluate(){
		String id=getPara("id");
    	String score=getPara("score");
    	
    	boolean bool= TeachDocRecord.dao.Evaluate(id,score);
    	renderJson(bool);
	}
}
