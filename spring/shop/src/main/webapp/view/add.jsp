<%--
  User: campus2H030
  Date: 2024-11-25
  Time: 오후 3:20
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<html>
<%@ include file="./head.jsp" %>

<body>
<h1 class="text-2xl" onclick="setDefault()">Add Cust</h1>
<form id="frm" action="${pageContext.request.contextPath}/add" method="POST">
    <label for="name">Name:
        <input type="text" id="name" name="name">
    </label>
    <label for="name">Tel:
        <input type="tel" id="tel" name="tel">
    </label>
    <label for="name">Email:
        <input type="email" id="email" name="email">
    </label>

    <input type="submit" value="Add">
</form>

<%--테스트를 위한 default 설정--%>
<script>
    function setDefault() {
        const name = document.getElementById('name');
        name.value = 'Hong';
        tel.value = '010-2222-3333';
    }
</script>

</body>
</html>
