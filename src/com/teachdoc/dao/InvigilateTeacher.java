package com.teachdoc.dao;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class InvigilateTeacher extends Model<InvigilateTeacher> {
	
	public static final InvigilateTeacher dao=new InvigilateTeacher();
//	public void updatePerson(){
//		StringBuffer sql = new StringBuffer();
//		sql.append("update test set person_name=? where id=?"); 
//		return Db.update(sql.toString(),person_name,id)>0;
//	}
	
	//通过test_id来查询对应的test信息**********显示给研究所助理
	public List searchTestByID(String test_id){
		StringBuffer sql = new StringBuffer();
		sql.append("select course_id,term,testtime,usertime,teststyle,class_person,testplace,need_person,person_name from test where id=? ");
		return Db.find(sql.toString(),test_id);
	}

	//通过lab_id得到此研究所的考试和对应的人数
	public List searchLabNum(int lab_id){
		StringBuffer sql = new StringBuffer();
		switch(lab_id){
		case 1:
			sql.append("select test_id,numOf1"
					+ " from invigilator_arr "
					+ "where numOf1>0");
		case 2:
			sql.append("select test_id,numOf2"
					+ " from invigilator_arr "
					+ "where numOf2>0");
		case 3:
			sql.append("select test_id,numOf3"
					+ " from invigilator_arr "
					+ "where numOf3>0");
		case 4:
			sql.append("select test_id,numOf4"
					+ " from invigilator_arr "
					+ "where numOf4>0");
		case 5:
			sql.append("select test_id,numOf5"
					+ " from invigilator_arr "
					+ "where numOf5>0");
		}
		
		return Db.find(sql.toString());

	}

	//


	//用user_id得到lab_id
	public List searchLabByID(int user_id){
		StringBuffer sql = new StringBuffer();
		sql.append("select which_laboratory from user where id=? ");
		List lab_name = Db.find(sql.toString(),user_id);
		Record lab = (Record) lab_name.get(0);
		String la = lab.toString();
		//toString可能格式不对
		//String t = lab_name.toString();

		return Db.find("select lab_id from researchLab where lab_name=?",la);
	}
	
	//通过login_account得到id
	public List searchIdByAccount(String login_account){
		StringBuffer sql = new StringBuffer();
		sql.append("select id from user where login_account=?");
		return Db.find(sql.toString(),login_account);
	}

}
