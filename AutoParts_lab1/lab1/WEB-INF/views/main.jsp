<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.ArrayList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="styles/main.css" type="text/css">
	<title>Список</title>
</head>
<body>
	<div class="wrap">
		<div class="container">
			<div class="content">
				<table id="tbl">
					<tr>
						<th>#</th>
						<th>Название</th>
						<th>Стоимость</th>
						<th>Количество</th>
					</tr>
					<% ArrayList<ArrayList<String>> list = (ArrayList<ArrayList<String>>)request.getAttribute("data"); %>
					<% if (list.size()> 0){
						int size=list.size()-1;
						int size_in=list.get(0).size()-1;
						for(int i=0; i<=size; i++){%> 
							<%="<tr>"%>
							<%="<td>" + (i+1) +"</td>"%>
							<%for(int j=0; j<=size_in; j++){%>
								<%="<td>" + list.get(i).get(j) + "</td>"%>
							<%}%>
							<%="</tr>"%>
						<%}
						}%>
				</table>
			</div>
			<div class="control">
				<form method="post" action="add">
					<input class="add_btn" type="submit" value="Добавить"></input>
				</form>
				<input class="delete_btn" type="submit" value="Удалить" onclick="send_data()"></input>
				<form method="post" action="main" id="form"></form>
			</div>
		</div>
	</div>
</body>
<script src="script/main.js"></script>
</html>