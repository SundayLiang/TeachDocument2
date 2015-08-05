package com.teachdoc.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.apache.poi.ss.formula.functions.T;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;
import com.teachdoc.dao.TaskStandard;

public class TaskStandardController extends Controller{
	
	private Gson gson = new Gson();
	
	public void SearchByTaskId(){
		HashMap jsonMap = new HashMap();
    	String taskid=getPara("taskid");
    	String courseNature=getPara("courseNature");    	
    	List<Record> list= TaskStandard.dao.searchStandardByTaskId(taskid, courseNature);
    	renderJson(list);
	}

}
