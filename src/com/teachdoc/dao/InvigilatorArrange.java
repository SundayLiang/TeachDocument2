package com.teachdoc.dao;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class InvigilatorArrange extends Model<InvigilatorArrange> {

	public static final InvigilatorArrange dao=new InvigilatorArrange();
	public int update(int test_id,int num1,int num2,int num3,int num4,int num5){
		StringBuffer sql = new StringBuffer();
		sql.append("update invigilator_arr"
				+ " set numOf1=?,numOf2=?,numOf3=?,numOf4=?,numOf5=?"
				+ " where test_id=?");
		return Db.update(sql.toString(),num1,num2,num3,num4,num5,test_id);
	}
	public List searchAll(int lab_id){
		StringBuffer sql = new StringBuffer();
		sql.append("select numOf"+lab_id
				+ " from invigilator_arr i "
				+ "where 1 ");
		System.out.println(sql.toString());
		return Db.find(sql.toString());	
	}
	
	public List searchByID(int test_id, int lab_id){
		StringBuffer sql = new StringBuffer();
		sql.append("select numOf"+lab_id+" from invigilator_arr where test_id=? ");
		return Db.find(sql.toString(),test_id);
	}

	public int insert(int test_id,int[] num){
		StringBuffer sql = new StringBuffer();
		sql.append("insert into invigilator_arr("
				+ "test_id,numOf1,numOf2,numOf3,numOf4,numOf5)"
				+ "value(?,?,?,?,?,?);");
		return Db.update(sql.toString(), test_id,num[0],num[1],num[2],num[3],num[4]);
		
	}
	
	public int updateIsArrToLab(int test_id){
		StringBuffer sql = new StringBuffer();
		sql.append("update test"
				+ " set isArrToLab=1"
				+ " where id=?");
		return Db.update(sql.toString(),test_id);
	}
//	
//	public boolean delete(){
//		
//	}
}
