#����nodejs��ѧԱ��������ϵͳ
##��Ҫ����ģ��
###1.ѧԱ��Ϣ��Ӳ���add
###2.ѧԱ��Ϣ�鿴����list
###3.ѧԱ��Ϣ�༭�޸Ĳ���edit
###4.ѧԱ��Ϣɾ������del
##��Ҫ������
##һ:·��
		·���������ӳ���ϵ  ������Ӧ·���ҵ���Ӧ����
##��:ģ���ʹ��
		
###1.��λ�ȡ����ģ�� ----require(module)
		
###2.ʹ��ϵͳģ��http�������
####1)http.createServer()������ʹ��
####2)server.listen(3000)�����˿�

###3.ʹ��ϵͳģ��fs���ļ����в���
####1)fs.readFile(pathname,(err,file),callback):��ȡ��Ӧ�ļ�(����)
####2)fs.open(file,'r/w/a',(err,fd),callback)���ļ� 
	  r:��ģʽ w:дģʽ a:׷��ģʽ
####3)fs.write(fd,string)  ���ַ���������Ӧ���ͻ���
	  JSON.stringify([]/obj):��һ����������ݽ������ַ���

###4.ʹ��ϵͳģ��url   url.parse()����·��
###5.ʹ��·��pathϵͳģ��             
	 path.join(path1,path2):��·�����н���(ƴ��)��/index/add/����ʽ
###6.querystringϵͳģ��
	 querystring.parse(string):��һ���ַ��������ɶ���
###7.�ļ�ģ��
	  ͨ��require()������ȡ�ļ������ļ�����
###8.������ģ�� 
####1)mime�ļ����ͽ���ģ���ʹ��
		mime.loookup(pathname):��·�����������ļ����͵���ʽ
####1)ģ������art-template��nodejs��ǰ��ҳ������ʹ��
		1>nodejs��ģ�������ʹ�ã�template(tpl,data)ƴ��ģ��
		2>ģ�����������template.config('base',path);
		3>ǰ��ҳ����ģ�������ʹ��{{each list}}��������
##��:ES6��ʹ��
	__filename:��ǰ��������Ŀ¼
	__dirname:��ǰ�������ڵľ���·��
##��:get��post����
		get����ʱ���͵�������url���
		post����ʱ������������������