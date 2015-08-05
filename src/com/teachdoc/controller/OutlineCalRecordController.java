package com.teachdoc.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.OutlineCalRecord;
import com.teachdoc.dao.TeachDocRecord;

public class OutlineCalRecordController extends Controller{
	
	public void search(){
		 String year= getPara("year");
		 String courseid= getPara("id");
    	 List<Record> list= OutlineCalRecord.dao.search(null,year,courseid);
    	 renderJson(list);
	}
	
	public void Evaluate(){
		String id=getPara("id");
    	String score=getPara("score");
    	
    	boolean bool= OutlineCalRecord.dao.Evaluate(id,score);
    	renderJson(bool);
	}

}
