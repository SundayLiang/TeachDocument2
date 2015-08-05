package com.teachdoc.util;

import java.io.File;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.CourseTest;
import com.teachdoc.dao.TaskStandard;
import com.teachdoc.dao.TeachDoc;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

public class PdfProducer {

	public boolean makeEnrollPDF(String tplPath,OutputStream os,String id)
	{
		File reportFile=new File(tplPath);
		HashMap parameter = new HashMap();
		try {
			List<String> data=new ArrayList<String>();
			data.add("hello");
			JasperReport jasperReport=(JasperReport)
					JRLoader.loadObject(reportFile);
			List<Record> list=CourseTest.dao.searchByID(id);
			if(list.size()<1){
				return true;	
			}
			Record record =list.get(0);
			String coursename=null;
			String teachername=null;
			String plantime=null;
			String classtime=null;
			List<Record> lists=TeachDoc.dao.searchTest(record.get("course_id").toString(),record.get("term").toString());
			if(lists.size()>0){
				coursename=lists.get(0).get("coursename").toString();
				teachername=lists.get(0).get("teachername").toString();
				plantime=lists.get(0).get("plantime").toString();
				classtime=lists.get(0).get("classtime").toString();
			}
			for(int i=1;i<lists.size();i++){
				teachername+="、"+lists.get(i).get("teachername").toString();
			}
			parameter.put("coursename",coursename.toString());
			parameter.put("teachername", teachername.toString());
			parameter.put("plantime", plantime.toString());
			parameter.put("classtime", classtime.toString());
			parameter.put("testtime", record.get("testtime").toString());
			parameter.put("usetime", record.get("usetime").toString()); 
			parameter.put("teststyle", record.get("teststyle").toString());
			parameter.put("scale", record.get("scale").toString());
			parameter.put("classper", record.get("class_person").toString());	
			parameter.put("date", record.get("applydate").toString());
			if(record.get("classes")!=null){
				String s[]=record.get("classes").toString().split("、");
				for(int i=1;i<(s.length+1);i++){
				    parameter.put("class"+i, s[i-1].toString());
				}
			}
			if(record.get("numberstu")!=null){
				String s[]=record.get("numberstu").toString().split("、");
				for(int i=1;i<(s.length+1);i++){
				    parameter.put("countp"+i, s[i-1].toString());
				}
			}
			
	        try {
			    JasperPrint jasperPrint=JasperFillManager
					.fillReport(jasperReport, parameter, new JRBeanCollectionDataSource(data));
			    JasperExportManager.exportReportToPdfStream(jasperPrint, os);
				os.close();
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}     
			
		} catch (JRException e) {
			e.printStackTrace();
			return false;
		}
	}
}
