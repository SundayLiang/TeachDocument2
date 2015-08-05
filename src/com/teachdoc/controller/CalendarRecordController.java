package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.shiro.authz.annotation.RequiresPermissions;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.CalendarRecord;
import com.teachdoc.dao.TaskStandard;
import com.teachdoc.dao.TeachDocRecord;;

public class CalendarRecordController extends Controller{

private Gson gson = new Gson();
	public void searchCalendarByTaskId(){
		HashMap jsonMap = new HashMap();
    	String taskid=getPara("taskid");
    	String term=getPara("term");      	
    	List<Record> list= CalendarRecord.dao.searchCalendarByTaskId(taskid,term);
    	renderJson(list);	
	}
	
	public void Evaluate(){
		String id=getPara("id");
    	String score=getPara("score");
    	
    	boolean bool= CalendarRecord.dao.Evaluate(id,score);
    	renderJson(bool);
	}
}
