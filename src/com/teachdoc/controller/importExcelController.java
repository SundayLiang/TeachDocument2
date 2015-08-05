package com.teachdoc.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;
import com.teachdoc.dao.importExcel;
import com.teachdoc.dao.User;

import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;  
import org.apache.poi.hssf.usermodel.HSSFSheet;  
import org.apache.poi.hssf.usermodel.HSSFRow;  
import org.apache.poi.hssf.usermodel.HSSFCell;  

import java.io.File;
import java.io.FileInputStream;  
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

public class importExcelController extends Controller{
	private final int MAXSize = 50 * 1024 * 1024;
    private String filedir="D://evaluate"+File.separator;
    
 //-------------------------------------------导入课堂评价成绩--------------------------------------------------
	public void importexcel(){
		String fileLastName="";
    	File file=null;
		try{  
			 List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
	            for (UploadFile fileItem : upFiles) {
	            	fileLastName=fileItem.getOriginalFileName().substring(fileItem.getOriginalFileName().indexOf("."),fileItem.getOriginalFileName().length());
	                file=fileItem.getFile();
	            }
	        String teacherId=null;
	        String courseId=null;
	        String score=null;
	        String term=getPara("term");
		
			HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(file));  
			
			HSSFSheet sheet = workbook.getSheetAt(0);  
		
			int totalRow = sheet.getLastRowNum();
		
			HSSFRow row = sheet.getRow(0);  
			HSSFCell cell = row.getCell(0);  
			
			for(int i=2; i<=totalRow; i++){
				HSSFRow row1 = sheet.getRow(i);
//				System.out.println(i+","+1);
				HSSFCell cell1 = row1.getCell(0);
//				System.out.println(i+","+2);
				HSSFCell cell2 = row1.getCell(3);
//				System.out.println(i+","+3);
				HSSFCell cell3 = row1.getCell(17);
//				System.out.println(i+","+4);
				teacherId=cell1.getStringCellValue();
//				System.out.println(i+","+5);
				courseId=cell2.getStringCellValue();
//				System.out.println(i+","+6);
				score = cell3.getStringCellValue();
//				System.out.println(i+","+7);
				List<Record> list=importExcel.dao.getCtId(teacherId, courseId, term);
//				System.out.println(i+","+8);
//				System.out.println(list.toString());
				Record rr=list.get(0);
				String taskId=rr.getInt("id").toString();
				System.out.println(taskId);
				importExcel.dao.insertStuEva(taskId, score);
			}
			//System.out.println("���϶˵�Ԫ�ǣ� " + cell.getStringCellValue()+totalRow);   
			}catch(Exception e) {  
			System.out.println("xlRead() : " + e );  
			} 
		
		
		redirect("/evaluate/uploadExcel.html?im=1");
	}
//------------------------------------------导入教师信息--------------------------------------------------	
	public void importTeachers(){
		String fileLastName="";
    	File file=null;
		try{  
			 List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
	            for (UploadFile fileItem : upFiles) {
	            	fileLastName=fileItem.getOriginalFileName().substring(fileItem.getOriginalFileName().indexOf("."),fileItem.getOriginalFileName().length());
	                file=fileItem.getFile();
	            }
	            
	            HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(file));  
				HSSFSheet sheet = workbook.getSheetAt(0);  
				int totalRow = sheet.getLastRowNum();
				for(int i=2; i<=totalRow; i++){
					HSSFRow row1 = sheet.getRow(i);
//					System.out.println(i+","+1);
					HSSFCell cell1 = row1.getCell(0);
//					System.out.println(i+","+2);
					HSSFCell cell2 = row1.getCell(1);
//					System.out.println(i+","+3);
					HSSFCell cell3 = row1.getCell(2);
					HSSFCell cell4 = row1.getCell(3, HSSFRow.RETURN_BLANK_AS_NULL);
					String name = cell2.getStringCellValue();
//					System.out.println(name);
					String logc = cell1.getStringCellValue();
//					System.out.println(logc);
					String laboratory = null;
					if (!(cell4==null)){
						laboratory = cell4.getStringCellValue();
					}
					
//					System.out.println(laboratory);
					List<Record> list = User.dao.search(logc);
					if(list.size()==0){
					User.dao.insert(name, "2", null, logc, laboratory);
					}
					else
						System.out.println(logc+"用户已存在！");
						
					
				}
	//System.out.println("共有 " + cell.getStringCellValue()+totalRow);  
				redirect("/importExcel/tell.html");
	}catch(Exception e) {  
	System.out.println("xlRead() : " + e );  
	} 
}
//----------------------------------------导入课程--------------------------------------------------
	public void importCourse(){
		String year=getPara("teachYear");
		String fileLastName="";
    	File file=null;
		try{  
			 List<UploadFile> upFiles = getFiles(filedir, MAXSize, "utf-8");
	            for (UploadFile fileItem : upFiles) {
	            	fileLastName=fileItem.getOriginalFileName();
	                file=fileItem.getFile();
	            }
	    		File f =new File(filedir+"plan");
	    		if (!f.exists()  && !f.isDirectory()){       
	    		    f.mkdirs();    
	    		}
	    		File fi=new File(filedir+"plan"+File.separator+fileLastName);
	    		if(!fi.exists()){
	    			file.renameTo(fi);
	    			importExcel.dao.insertPlan(year, filedir+File.separator+"plan"+File.separator+File.separator+fileLastName);
	    			 HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(fi));  
	 				HSSFSheet sheet = workbook.getSheetAt(0);
	 				int totalRow = sheet.getLastRowNum();
	 				for(int i=2; i<=totalRow; i++){
						HSSFRow row1 = sheet.getRow(i);
						HSSFCell courseNumCell = row1.getCell(0);
						HSSFCell courseNameCell = row1.getCell(1);
						HSSFCell courseThoeryCell = row1.getCell(3);
						HSSFCell courseExpCell = row1.getCell(4);
						HSSFCell courseTotleCell = row1.getCell(2);
						HSSFCell courseExtraCell = row1.getCell(7);
						HSSFCell courseNatureCell = row1.getCell(10);
						HSSFCell courseMethodCell = row1.getCell(11);
						HSSFCell coursePatternCell = row1.getCell(12);
						String courseNum = courseNumCell.getStringCellValue();
						String courseName = courseNameCell.getStringCellValue();
						String courseThoery = courseThoeryCell.getStringCellValue();
						String courseExp = courseExpCell.getStringCellValue();
					    String courseTotle = courseTotleCell.getStringCellValue();
						String courseNature = courseNatureCell.getStringCellValue();
						String courseMethod = courseMethodCell.getStringCellValue();
						String coursePattern = courseMethodCell.getStringCellValue();
						String realNature = "";
						if (coursePattern=="设计课（实践、上机）"){
							realNature = "实践课程-考查-上机";
						}
						else if (courseNature=="学位课"){
							realNature+="必修-";
							if(courseMethod=="考试"){
								realNature+="考试-";
							}
							else
							{
								realNature+="考查-";
							}
						}
						else
						{
							realNature+="选修-考查-";
						}
						}
	    			redirect("/importExcel/tellcourse.html?flag=yes");
	    		}
	    		else{
	    			System.out.println("wenjianyicunzai");
	    			file.delete();
	    			redirect("/importExcel/tellcourse.html?flag=no");
	    			
	    			return;
	    		}
	    		
	    		
		}
		catch(Exception e){}
	}
//----------------------------------------导入教学任务-----------------------------------------------
	public void importTask(){}
}
