<table class="plugin-login">
	<caption>接口数据</caption>
	<thead>
		<tr>
			<th>字段</th>
			<th>数据</th>
		</tr>
	</thead>
	<tbody>
		<%
			_.each(data, function(content, i){
		%>
		
		<tr>
			<td><%= i %></td>
			<td><%= content && StringUtil.formatLen(content, 15) %></td>
		</tr>
		<%
			})
		%>
	</tbody>
</table>