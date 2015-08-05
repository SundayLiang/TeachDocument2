package com.teachdoc.controller;

import java.util.StringTokenizer;

import com.jfinal.core.Controller;
import com.teachdoc.dao.InvigilatorArrange;

public class InvigilatorController extends Controller {
	public void updateInvigilatorLab(){
		
	}
	
	public void insertInvigilatorLab(){
		int test_id = getParaToInt("test_id");
		String nums = getPara("numbers");
		StringTokenizer st = new StringTokenizer(nums,"、");
		
		int[] numbers = new int[5];
		for(int k=0;k<5;k++){
			numbers[k] = Integer.parseInt(st.nextToken());
			System.out.println(numbers[k]);
		}
		int i = InvigilatorArrange.dao.insert(test_id,numbers);
		int j = InvigilatorArrange.dao.updateIsArrToLab(test_id);
//		
		renderJson();
	}
}
