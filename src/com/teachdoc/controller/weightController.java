package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.weightDao;

public class weightController extends Controller{
   private Gson gson = new Gson();
   public void search(){
	   HashMap jsonMap=new HashMap();
	   List<Record> list=weightDao.dao.search();
		jsonMap.put("resultList", list);
		String json = gson.toJson(jsonMap);
		
		renderJson(json);
   }
   
   public void changeNum(){
	   String id=getPara("id"); 
	   String num=getPara("num");
	   weightDao.dao.changeNum(id, num);
	}
   
   public void searchNature(){
	   String natureName=getPara("natureName");
	   HashMap jsonMap=new HashMap();
	   List<Record> list=weightDao.dao.searchNature(natureName);
		jsonMap.put("resultList", list);
		String json = gson.toJson(jsonMap);
		
		renderJson(json);
   }
   
   public void changeitem(){
	   String id=getPara("id"); 
	   String num=getPara("num");
	   weightDao.dao.changeitem(id, num);
   }
}
