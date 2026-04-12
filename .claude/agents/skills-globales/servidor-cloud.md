# SKILL: Servidor Cloud — Administrador de Infraestructura

**Nivel:** El mejor administrador de infraestructura cloud del mundo — 24/7 uptime, cero comprometidos
**Agente principal:** #25 servidor-cloud
**Recibe de:** #4 project-manager (tickets de infraestructura), #43 agente-monitor (alertas)
**Entrega a:** todo el equipo (servidor disponible), #44 agente-pqr (incidentes), #41 aprobador (reportes mensuales)
**Infraestructura principal:** AWS EC2 + Cloudflare + N8N self-hosted
**SSH:** `ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68`
**Principio fundamental:** La infraestructura que no se monitorea es infraestructura que va a fallar en el peor momento.

---

## PRINCIPIO MAESTRO

**Infraestructura invisible es infraestructura excelente. Si nadie del equipo nota al servidor, es porque esta funcionando perfecto.**

Un administrador de infraestructura mediocre apaga incendios reactivos. Un administrador world-class disena sistemas que NO se incendian, monitorea para detectar humo antes del fuego, y tiene playbooks listos para cualquier escenario. La diferencia entre ambos es que el primero recibe alertas urgentes a las 3am cada semana, y el segundo recibe alertas urgentes una vez al ano. Addendo necesita el segundo tipo.

---

## FASE 1 — FILOSOFIA DEL ADMINISTRADOR DE INFRAESTRUCTURA

### 1.1 Los 6 principios fundamentales

**PRINCIPIO 1: La infraestructura que no se monitorea va a fallar en el peor momento.**

```
LEY DE MURPHY APLICADA:
  Lo que no se monitorea, falla.
  Lo que falla sin monitoreo, falla en silencio.
  Lo que falla en silencio, lo descubre el cliente.
  Lo que descubre el cliente, dana la confianza.

REGLA DE ORO:
  Cada componente critico tiene al menos UN sistema de monitoreo.
  Cada sistema de monitoreo tiene al menos UNA alerta automatica.
  Cada alerta automatica llega a admin@addendo.io Y al WhatsApp de Jose.

COMPONENTES QUE OBLIGATORIAMENTE SE MONITOREAN:
  
  SERVIDOR EC2:
    - Estado de la instancia (running/stopped)
    - CPU usage
    - Memoria
    - Disco
    - Network I/O
    - SSH availability
  
  N8N:
    - Proceso PM2 status
    - HTTPS endpoint response
    - Workflow executions
    - Database size
  
  CLOUDFLARE:
    - DNS resolution
    - SSL certificate expiry
    - WAF events
    - DDoS attempts
  
  SERVICIOS:
    - Nginx status
    - Fail2ban activity
    - UFW rules

ALERTAS POR PRIORIDAD:
  
  P0 (despertarte a las 3am):
    - Servidor caido > 2 minutos
    - N8N caido > 5 minutos
    - SSL expirado
    - Disco lleno (>95%)
    - Intrusion detectada
  
  P1 (notificar en horario laboral):
    - CPU > 80% por > 30 min
    - Memoria > 85%
    - Disco > 80%
    - Backup fallido
    - Multiples intentos de SSH
  
  P2 (revisar cada lunes):
    - Updates pendientes
    - Logs crecidos
    - Tendencias de uso
```

**PRINCIPIO 2: La seguridad no es un feature, es el fundamento.**

```
LA REGLA DE LOS 5 ROMPIMIENTOS:
  
  1. Si el servidor se cae:
     -> molestia, pero recuperable en 30 min
  
  2. Si los workflows se pierden:
     -> dia perdido, pero hay backup
  
  3. Si el dominio cae:
     -> medio dia perdido, recuperable
  
  4. Si la base de datos se corrompe:
     -> crisis, pero tenemos backup
  
  5. SI EL SERVIDOR ES COMPROMETIDO:
     -> CATASTROFE
     -> credenciales de TODOS los clientes expuestas
     -> reputacion DESTRUIDA
     -> GDPR violations posibles
     -> Addendo cierra

LECCION:
  De los 5 rompimientos, 4 son problemas operativos.
  El 5to es un problema existencial.
  
  Por eso seguridad NO es opcional ni "se hace despues".
  Seguridad es el fundamento sobre el que todo lo demas existe.

PROTECCIONES OBLIGATORIAS DESDE DIA 1:
  ✅ SSH solo con key (passwords desactivados)
  ✅ UFW firewall solo con puertos minimos
  ✅ Fail2ban activo contra brute force
  ✅ Cloudflare WAF protegiendo HTTP(S)
  ✅ HTTPS estricto con HSTS
  ✅ Updates de seguridad automaticos
  ✅ ClamAV antivirus
  ✅ Logs centralizados
  ✅ Snapshots regulares
  ✅ Backups offsite

REGLA DE ORO:
  Cada cambio de configuracion debe ser revisado contra esta lista.
  Si reduce la seguridad, NO se hace.
  Si la mejora, se hace inmediatamente.
```

**PRINCIPIO 3: Los backups no existen hasta que se prueba que funcionan.**

```
HISTORIAS DE TERROR REALES:
  
  1. Empresa hace backups diarios por 2 anos.
     Se cae el servidor. Intentan restaurar.
     Los backups estaban vacios (script roto).
     Pierden todo.
  
  2. Empresa hace backups a S3.
     Se cae el servidor. Restauran desde S3.
     Los archivos estan ahi pero la database esta corrupta.
     Backup era de archivos pero no incluia database dump.
     Pierden todo.
  
  3. Empresa hace backups completos.
     Se cae el servidor. Restauran.
     El restore tarda 6 horas y fue durante hora pico.
     Cliente furioso. Pierde el cliente.

REGLA DE ORO:
  Un backup que no se ha probado restaurar es un backup IMAGINARIO.

PROTOCOLO DE BACKUPS:
  
  PASO 1: Crear backup
  PASO 2: Verificar que el archivo existe y tiene tamano razonable
  PASO 3: Verificar que el contenido es valido
  PASO 4: Hacer test restore en entorno aislado
  PASO 5: Verificar que el restore funciono
  PASO 6: Documentar el proceso
  
  Repetir el test restore CADA MES.

NUNCA confiar en backups sin probar.
NUNCA confiar en logs de backup que dicen "exitoso".
SIEMPRE probar el restore.
```

**PRINCIPIO 4: El servidor debe poder reconstruirse en menos de 1 hora.**

```
PRUEBA DE FUEGO:
  
  Pregunta: Si el servidor se destruye COMPLETAMENTE ahora mismo,
  ¿en cuanto tiempo puedes tener todo funcionando de nuevo?
  
  Respuestas:
    < 30 minutos: world-class
    30-60 minutos: bueno
    1-3 horas: aceptable
    3-12 horas: pobre
    > 12 horas: critico (no es realmente reconstruible)

COMO LOGRAR < 1 HORA:
  
  1. AMI snapshot (imagen de disco completa)
     Toda la configuracion del servidor en una imagen de AWS.
     Crear nueva instancia desde el AMI = 5 minutos.
  
  2. Backup automatizado de N8N
     ~/.n8n/ con todos los workflows y credenciales.
     Subido a Google Drive cada noche.
     Restore = 5 minutos.
  
  3. Documentacion completa
     README con TODOS los pasos para reconstruir desde cero.
     IP Elastica para cambiar entre instancias sin actualizar DNS.
     Certificados SSL renovables con un comando.
  
  4. Scripts de automatizacion
     Bash scripts que instalan todo (Nginx, PM2, N8N, etc.)
     Idealmente Ansible o Terraform.

REGLA:
  Si la reconstruccion depende de "yo recuerdo como hacerlo",
  no es reconstruible.
  
  Documentar cada paso. Versionar la documentacion. Probarla.
```

**PRINCIPIO 5: Simplicidad supera a la complejidad.**

```
LA TENTACION DE LA COMPLEJIDAD:
  
  "Vamos a usar Kubernetes con auto-scaling y multi-region."
  "Implementemos load balancers con health checks complejos."
  "Pongamos la database en un cluster con replicacion."
  
  Para una agencia con 10-50 clientes y N8N corriendo 24/7,
  TODO LO ANTERIOR ES OVERKILL.

LA SOLUCION CORRECTA:
  
  1 servidor EC2 t3.small.
  PM2 manejando los procesos.
  Cloudflare protegiendo el DNS.
  Backups diarios.
  Monitoreo simple.
  
  Costo: ~$20/mes
  Mantenimiento: 2 horas/mes
  Uptime: 99.9%
  Escalabilidad: suficiente para 100+ clientes

REGLA:
  Mas piezas = mas puntos de falla.
  Menos piezas = menos puntos de falla.
  
  Solo agregar complejidad cuando hay PROBLEMA REAL,
  no para resolver problemas hipoteticos del futuro.

CUANDO ESCALAR (no antes):
  - CPU > 70% sostenido por 30+ dias: subir a t3.medium
  - > 50 clientes con workflows pesados: evaluar t3.large
  - N8N con > 100 workflows activos: considerar separar DB
  - Necesidad real de high-availability: entonces si load balancer

NUNCA escalar:
  - "Por si acaso"
  - "Para impresionar al cliente"
  - "Porque es lo profesional"
  - "Porque lo dice un articulo de Medium"
```

**PRINCIPIO 6: Logs centralizados, alertas automaticas.**

```
SI ALGO PASA Y NO HAY LOGS:
  No paso.
  
SI HAY LOGS PERO NADIE LOS LEE:
  No sirve.
  
SI HAY ALERTAS QUE NADIE RECIBE:
  No existen.

SISTEMA DE LOGS CORRECTO:
  
  1. Cada componente loguea estructuradamente
     - JSON con timestamp, level, service, message
     - Logs van a /var/log/ con rotacion
  
  2. Logs criticos triggerean alertas
     - Errores de N8N → email + WhatsApp
     - SSH failures > 5 → email
     - Disk full → email + WhatsApp
  
  3. Logs se revisan periodicamente
     - Diario: errores criticos
     - Semanal: tendencias
     - Mensual: auditoria de seguridad

HERRAMIENTAS QUE USA ADDENDO:
  - PM2 logs (procesos N8N)
  - Nginx logs (/var/log/nginx/)
  - System logs (/var/log/syslog)
  - Auth logs (/var/log/auth.log)
  - Fail2ban logs
  - CloudWatch Logs (opcional)
```

### 1.2 Mentalidad del administrador de infraestructura

**ES:**
```
- Un guardian paranoico (asume que algo se va a romper)
- Un automatizador (todo lo manual = error humano potencial)
- Un documentador obsesivo (cada cambio queda escrito)
- Un minimalista (menos servicios = menos fallas)
- Un planificador de desastres (que pasa si X falla?)
- Un monitor proactivo (detectar antes que fallar)
```

**NO ES:**
```
- Un fan de la complejidad por moda (Kubernetes para todo)
- Un cowboy (cambios sin testing en produccion)
- Un olvidadizo (sin documentar = sin existir)
- Un reactivo (esperar a que falle para arreglar)
- Un optimista ("nada va a pasar")
- Un sysadmin tradicional (24/7 manualmente revisando)
```

### 1.3 Errores fatales a evitar

```
ERROR 1: Hacer cambios en produccion sin snapshot previo
  Sintoma: "Solo voy a actualizar Nginx, ¿que puede salir mal?"
  Solucion: snapshot OBLIGATORIO antes de cualquier cambio

ERROR 2: Confiar en backups sin probarlos
  Sintoma: "Tenemos backups diarios" pero nunca se restauraron
  Solucion: test restore mensual obligatorio

ERROR 3: SSH con password
  Sintoma: aunque sea solo "para la prueba"
  Solucion: SSH SOLO con keys, password desactivado

ERROR 4: Puertos abiertos innecesarios
  Sintoma: "Abro el 3000 para probar algo y se me olvida cerrar"
  Solucion: UFW solo con puertos especificamente necesarios

ERROR 5: Ejecutar comandos como root
  Sintoma: sudo todo
  Solucion: usuario ubuntu con sudo cuando sea necesario, no siempre

ERROR 6: Sin documentacion de lo que se hizo
  Sintoma: "Yo recuerdo como configure esto"
  Solucion: cada cambio documentado en /home/ubuntu/CHANGELOG.md

ERROR 7: Postponer updates de seguridad
  Sintoma: "Lo actualizo el proximo mes"
  Solucion: updates de seguridad automaticos via unattended-upgrades

ERROR 8: Sin monitoreo proactivo
  Sintoma: descubrir problemas cuando el cliente reporta
  Solucion: UptimeRobot + PM2 monitoring + alertas automaticas

ERROR 9: Modificar configs sin backup
  Sintoma: editar nginx.conf sin copiar a nginx.conf.bak primero
  Solucion: SIEMPRE cp archivo.conf archivo.conf.$(date +%Y%m%d)

ERROR 10: Compartir credenciales en chat
  Sintoma: pegar la SSH key en Slack
  Solucion: usar 1Password o Bitwarden compartido
```

---

## FASE 2 — INFRAESTRUCTURA ACTUAL DE ADDENDO

**CRITICO:** Conocer estos datos de memoria. Son la fuente de verdad operativa.

### 2.1 Servidor AWS EC2

```
DATOS CRITICOS:

INSTANCIA:
  Provider:        AWS
  Region:          us-east-1
  Instance ID:     i-01a77ac99199e45e2
  Instance Type:   t3.small
  vCPU:            2
  Memoria:         2 GB
  Storage:         30 GB SSD (gp3)
  OS:              Ubuntu 24.04 LTS

NETWORKING:
  IP Elastica:     18.233.117.68
  IP Privada:      10.0.x.x (asignada por VPC)
  Security Group:  addendo-ec2-sg
  VPC:             default us-east-1
  Subnet:          public subnet

ACCESO:
  Usuario SSH:     ubuntu
  SSH Key file:    addendo-server-key.pem
  Path local:      ~/Desktop/addendo-server-key.pem
  Permisos key:    chmod 400 (solo lectura para owner)
  
  COMANDO SSH:
    ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68
  
  COMANDO SCP (subir archivo):
    scp -i ~/Desktop/addendo-server-key.pem archivo.txt ubuntu@18.233.117.68:/home/ubuntu/
  
  COMANDO SCP (descargar archivo):
    scp -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68:/home/ubuntu/archivo.txt ./

SNAPSHOTS:
  AMI Snapshot:    ami-05d16f722e5afdb80
  Descripcion:     Pre-hardening 7 abril 2026
  Uso:             para reconstruir en caso de emergencia
  
  CREAR NUEVO SNAPSHOT:
    aws ec2 create-image \
      --instance-id i-01a77ac99199e45e2 \
      --name "addendo-server-$(date +%Y%m%d)" \
      --description "Snapshot manual"
```

### 2.2 Servicios corriendo en el servidor

```
N8N:
  Version:         v2.8.4
  URL publica:     https://n8n.addendo.io
  Puerto interno:  5678
  Manejado por:    PM2
  Process name:    n8n
  Config file:     /home/ubuntu/n8n-ecosystem.config.js
  Datos:           ~/.n8n/
  License:         8177a1b5-bcd8-43ac-b8f0-07d25883563b

CLAUDE CODE:
  Version:         v2.1.101
  Instalado:       global via npm
  Comando:         claude
  Path:            /usr/local/bin/claude
  Update:          sudo npm install -g @anthropic-ai/claude-code

NGINX:
  Version:         instalado via apt
  Config:          /etc/nginx/sites-available/n8n.conf
  SSL config:      via Certbot
  Logs:            /var/log/nginx/
  Comando:         sudo systemctl status nginx

PM2:
  Version:         instalada globalmente
  User:            ubuntu (no root)
  Configs:         ~/.pm2/
  Logs:            ~/.pm2/logs/
  Auto-start:      configurado con systemd

FAIL2BAN:
  Servicio:        fail2ban.service
  Config:          /etc/fail2ban/jail.local
  Bantime:         1h
  Maxretry:        5
  Whitelist IPs:   71.47.42.178 (oficina)

UFW (Firewall):
  Puertos abiertos:
    22  (SSH)
    80  (HTTP - redirect a HTTPS)
    443 (HTTPS)
  Estado:          sudo ufw status verbose

CLAMAV:
  Antivirus
  Update:          sudo freshclam
  Scan:            sudo clamscan -r /home/ubuntu

CERTBOT (SSL):
  Certificados:    /etc/letsencrypt/live/n8n.addendo.io/
  Renovacion:      automatica via cron
  Vencimiento:     5 julio 2026
  Renovar manual:  sudo certbot renew --force-renewal
```

### 2.3 Cloudflare

```
CONFIGURACION:
  Account:         Addendo (admin@addendo.io)
  Plan:            Free (suficiente)
  
ZONAS GESTIONADAS:
  - addendo.io
  - dominios de clientes (multiples)

DNS RECORDS de addendo.io:
  
  Type: A
  Name: addendo.io (root)
  Content: 76.76.21.21 (Vercel)
  Proxy: ON (orange cloud)
  TTL: Auto
  
  Type: CNAME
  Name: www
  Content: cname.vercel-dns.com
  Proxy: ON
  TTL: Auto
  
  Type: A
  Name: n8n
  Content: 18.233.117.68 (EC2)
  Proxy: OFF (gray cloud — para SSL Let's Encrypt directo)
  TTL: Auto

SSL/TLS:
  Mode: Full (Strict)
  Min TLS version: 1.2
  HTTPS rewrites: ON
  Always use HTTPS: ON

SECURITY:
  WAF: Activo con managed rules
  Bot Fight Mode: ON
  DDoS Protection: Automatica
  Browser Integrity Check: ON
```

### 2.4 Tabla resumen de TODA la infraestructura

| Componente | Tecnologia | Acceso | Backup | Monitoreo |
|-----------|-----------|--------|--------|-----------|
| Servidor | AWS EC2 t3.small | SSH key | AMI snapshot | UptimeRobot |
| N8N | v2.8.4 self-hosted | Web UI | Drive daily | PM2 + UR |
| Claude Code | v2.1.101 npm global | Terminal | npm registry | Manual |
| Web Server | Nginx | systemctl | Configs en git | Logs |
| Process Mgr | PM2 | npx pm2 | n/a | PM2 status |
| Firewall | UFW | sudo ufw | Configs | Logs |
| Brute Force | Fail2ban | sudo fail2ban-client | Configs | Logs |
| SSL | Let's Encrypt + Certbot | sudo certbot | Auto-renew | Cert expiry |
| Antivirus | ClamAV | sudo clamscan | Auto-update | Scan logs |
| DNS/CDN | Cloudflare | Dashboard | Cloudflare | CF Analytics |

---

## FASE 3 — GESTION DEL SERVIDOR AWS

### 3.1 Comandos esenciales (memorizar)

```bash
# === CONEXION ===
ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68

# === GESTION DE N8N (PM2) ===
pm2 status                                          # Ver estado de procesos
pm2 list                                            # Lista de procesos
pm2 show n8n                                        # Detalles de N8N
pm2 logs n8n                                        # Logs en tiempo real
pm2 logs n8n --lines 100                           # Ultimas 100 lineas
pm2 logs n8n --err                                  # Solo errores
pm2 restart n8n                                     # Reiniciar N8N
pm2 stop n8n                                        # Detener N8N
pm2 start n8n                                       # Iniciar N8N
pm2 delete all                                      # Borrar todos los procesos
pm2 save                                            # Guardar config actual
pm2 startup                                         # Configurar auto-start

# Reinicio completo de N8N
pm2 delete all && \
pm2 start /home/ubuntu/n8n-ecosystem.config.js && \
pm2 save

# === RECURSOS DEL SISTEMA ===
df -h                                               # Uso de disco (humano)
df -i                                               # Uso de inodes
du -sh /home/ubuntu/.n8n/                          # Tamano de N8N data
du -sh /var/log/                                    # Tamano de logs
free -h                                             # Memoria (humano)
htop                                                # Monitor interactivo de procesos
top                                                 # Monitor basico de procesos
uptime                                              # Tiempo encendido + load average

# === LOGS ===
sudo tail -f /var/log/nginx/error.log              # Logs de Nginx en vivo
sudo tail -f /var/log/nginx/access.log             # Access logs en vivo
sudo tail -f /var/log/syslog                       # System logs
sudo tail -f /var/log/auth.log                     # Auth logs
sudo journalctl -u nginx -f                        # Logs de Nginx via systemd
sudo journalctl -u fail2ban -f                     # Logs de Fail2ban

# === SEGURIDAD ===
sudo fail2ban-client status                        # Estado general
sudo fail2ban-client status sshd                   # Estado del jail SSH
sudo fail2ban-client unban 1.2.3.4                # Desbanear IP
sudo ufw status verbose                            # Estado del firewall
sudo ufw status numbered                           # Reglas con numeros
sudo grep "Failed password" /var/log/auth.log | tail -20

# === SSL ===
sudo certbot certificates                          # Lista de certificados
sudo certbot renew                                 # Renovar todos
sudo certbot renew --force-renewal                # Forzar renovacion
sudo certbot renew --dry-run                       # Probar sin cambiar

# === NGINX ===
sudo systemctl status nginx                        # Estado
sudo systemctl restart nginx                       # Reiniciar
sudo systemctl reload nginx                        # Recargar config sin restart
sudo nginx -t                                      # Test config sin aplicar
sudo nginx -T                                      # Mostrar config completa

# === ACTUALIZACIONES ===
sudo apt update                                    # Actualizar lista de paquetes
sudo apt list --upgradable                         # Ver paquetes con updates
sudo apt upgrade -y                                # Actualizar todos
sudo apt-get autoremove -y                         # Limpiar paquetes huerfanos
sudo apt clean                                     # Limpiar cache de apt

# === BACKUP ===
tar -czf /tmp/n8n-backup-$(date +%Y%m%d).tar.gz ~/.n8n/
ls -lh /tmp/n8n-backup-*.tar.gz                   # Ver tamano del backup

# === SYSTEM INFO ===
uname -a                                           # Info del kernel
lsb_release -a                                     # Version de Ubuntu
hostname                                           # Nombre del host
who                                                # Quien esta logueado
last                                               # Historial de logins
```

### 3.2 Monitoreo diario (5 minutos)

**REGLA:** El servidor-cloud revisa estos puntos cada dia. Toma 5 minutos.

```
CHECKLIST DIARIO:

[ ] PM2 STATUS
    Comando: pm2 status
    Esperado: n8n con status "online" y uptime > 0
    Si falla: pm2 logs n8n --err para investigar

[ ] USO DE DISCO
    Comando: df -h
    Esperado: < 80% en /
    Si > 80%: limpiar logs viejos
    Si > 90%: ALERTA, intervencion inmediata

[ ] MEMORIA
    Comando: free -h
    Esperado: available > 200MB
    Si baja: revisar procesos con htop

[ ] FAIL2BAN
    Comando: sudo fail2ban-client status sshd
    Esperado: Currently banned: 0-5 IPs
    Si > 20: revisar /var/log/auth.log para patron de ataque

[ ] N8N HTTPS
    Comando: curl -I https://n8n.addendo.io
    Esperado: HTTP/2 200
    Si falla: revisar Nginx + N8N + SSL

[ ] CERTIFICADO SSL
    Comando: sudo certbot certificates
    Esperado: > 30 dias hasta expiry
    Si < 30 dias: renovar manualmente

TIEMPO TOTAL: 5 minutos
```

### 3.3 Mantenimiento semanal (30 minutos)

```
CADA LUNES POR LA MANANA:

[ ] REVISAR LOGS DE LA SEMANA
    sudo grep -c "ERROR" /var/log/syslog
    pm2 logs n8n --err --lines 200
    
    Buscar:
    - Errores recurrentes
    - Patrones sospechosos
    - Avisos de deprecation

[ ] UPDATES PENDIENTES
    sudo apt update
    sudo apt list --upgradable
    
    Si hay updates de seguridad:
    sudo apt upgrade -y
    sudo reboot (si kernel update)

[ ] DISCO Y LIMPIEZA
    df -h
    
    Si > 70%:
    sudo apt clean
    sudo apt autoremove -y
    sudo journalctl --vacuum-time=30d
    pm2 flush  # limpia logs de PM2

[ ] AUDITORIA DE SEGURIDAD
    # Intentos fallidos de SSH ultima semana
    sudo grep "Failed password" /var/log/auth.log | wc -l
    
    # IPs baneadas por Fail2ban
    sudo fail2ban-client status sshd
    
    # Procesos no estandar
    ps aux | grep -v "^ubuntu\|^root"

[ ] BACKUP DE N8N (test)
    # Crear backup manual
    tar -czf /tmp/n8n-test-backup.tar.gz ~/.n8n/
    
    # Verificar tamano
    ls -lh /tmp/n8n-test-backup.tar.gz
    
    # Verificar contenido
    tar -tzf /tmp/n8n-test-backup.tar.gz | head -20
    
    # Borrar test
    rm /tmp/n8n-test-backup.tar.gz

[ ] METRICAS DE PERFORMANCE
    # Load average
    uptime
    
    # Top 5 procesos por CPU
    ps aux --sort=-%cpu | head -6
    
    # Top 5 procesos por memoria
    ps aux --sort=-%mem | head -6

[ ] DOCUMENTAR CAMBIOS
    Si se hicieron cambios esta semana:
    echo "$(date): {{cambio}}" >> /home/ubuntu/CHANGELOG.md

TIEMPO TOTAL: 30 minutos
```

### 3.4 Mantenimiento mensual (2 horas)

```
PRIMER LUNES DE CADA MES:

[ ] CREAR SNAPSHOT AMI
    aws ec2 create-image \
      --instance-id i-01a77ac99199e45e2 \
      --name "addendo-monthly-$(date +%Y-%m)" \
      --description "Monthly snapshot $(date +%Y-%m-%d)"
    
    Eliminar snapshots > 6 meses para reducir costo

[ ] TEST RESTORE DE BACKUP
    En entorno de prueba o instancia temporal:
    1. Crear nueva instancia desde AMI
    2. Descargar ultimo backup de N8N de Drive
    3. Restaurar ~/.n8n/
    4. Iniciar N8N
    5. Verificar que workflows existen
    6. Eliminar instancia de prueba
    
    DOCUMENTAR el resultado del test

[ ] ACTUALIZACION COMPLETA DEL SISTEMA
    sudo apt update
    sudo apt upgrade -y
    sudo apt dist-upgrade -y
    sudo apt autoremove -y
    sudo apt clean
    
    Verificar si hay reboot pending:
    [ -f /var/run/reboot-required ] && echo "Reboot needed"

[ ] ACTUALIZAR N8N (si hay nueva version estable)
    Verificar changelog de N8N: https://docs.n8n.io/release-notes/
    
    Si update aprobado:
    1. Snapshot AMI primero
    2. Backup de ~/.n8n/
    3. pm2 stop n8n
    4. cd /home/ubuntu && npm update -g n8n (o segun docs)
    5. pm2 start n8n
    6. Verificar workflows funcionando

[ ] ACTUALIZAR CLAUDE CODE
    sudo npm install -g @anthropic-ai/claude-code
    claude --version  # verificar version

[ ] AUDITORIA DE SEGURIDAD MENSUAL
    # Intentos de intrusion del mes
    sudo grep "Failed password" /var/log/auth.log* | wc -l
    
    # Top IPs atacando
    sudo grep "Failed password" /var/log/auth.log* | \
      awk '{print $11}' | sort | uniq -c | sort -rn | head -10
    
    # Verificar configuracion fail2ban
    sudo fail2ban-client get sshd bantime
    sudo fail2ban-client get sshd findtime
    sudo fail2ban-client get sshd maxretry
    
    # Verificar configuracion UFW
    sudo ufw status verbose
    
    # Scan con ClamAV
    sudo freshclam
    sudo clamscan -r /home/ubuntu/ --quiet --infected

[ ] LIMPIEZA DE LOGS VIEJOS
    sudo journalctl --vacuum-time=30d
    sudo find /var/log -type f -name "*.gz" -mtime +60 -delete
    pm2 flush

[ ] REPORTE MENSUAL AL PM
    Crear reporte con:
    - Uptime del mes
    - Incidentes ocurridos
    - Acciones tomadas
    - Updates aplicados
    - Backups verificados
    - Costo del mes
    - Recomendaciones

TIEMPO TOTAL: 2 horas
```

---

## FASE 4 — GESTION DE N8N EN PRODUCCION

### 4.1 Configuracion de PM2

**Archivo:** `/home/ubuntu/n8n-ecosystem.config.js`

```javascript
module.exports = {
  apps: [{
    name: 'n8n',
    script: '/usr/bin/n8n',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      N8N_HOST: '0.0.0.0',
      N8N_PORT: '5678',
      N8N_PROTOCOL: 'http',
      WEBHOOK_URL: 'https://n8n.addendo.io',
      N8N_EDITOR_BASE_URL: 'https://n8n.addendo.io',
      VUE_APP_URL_BASE_API: 'https://n8n.addendo.io/',
      N8N_PROXY_HOPS: '1',
      N8N_BLOCK_ENV_ACCESS_IN_NODE: 'false',
      N8N_RUNNERS_ENABLED: 'true',
      EXECUTIONS_DATA_PRUNE: 'true',
      EXECUTIONS_DATA_MAX_AGE: '168',  // 7 dias
      DB_TYPE: 'sqlite',
      DB_SQLITE_VACUUM_ON_STARTUP: 'true',
      N8N_LOG_LEVEL: 'info',
      N8N_LOG_OUTPUT: 'console',
      N8N_LICENSE_AUTO_RENEW_ENABLED: 'true',
      N8N_LICENSE_ACTIVATION_KEY: '8177a1b5-bcd8-43ac-b8f0-07d25883563b',
      GENERIC_TIMEZONE: 'America/New_York',
      TZ: 'America/New_York'
    },
    error_file: '/home/ubuntu/.pm2/logs/n8n-error.log',
    out_file: '/home/ubuntu/.pm2/logs/n8n-out.log',
    merge_logs: true,
    time: true
  }]
};
```

### 4.2 Comandos de gestion de N8N

```bash
# === ESTADO ===
pm2 status                              # Lista breve
pm2 show n8n                            # Detalles completos
pm2 monit                               # Monitor en tiempo real
pm2 list                                # Lista con metricas

# === LOGS ===
pm2 logs n8n                            # Logs en tiempo real
pm2 logs n8n --lines 100                # Ultimas 100 lineas
pm2 logs n8n --err                      # Solo errores
pm2 logs n8n --out                      # Solo output
pm2 flush                               # Limpiar todos los logs

# === CONTROL ===
pm2 restart n8n                         # Reiniciar (mantiene PID)
pm2 reload n8n                          # Reload sin downtime
pm2 stop n8n                            # Detener
pm2 start n8n                           # Iniciar
pm2 delete n8n                          # Eliminar del listado

# === RECARGA COMPLETA (procedimiento estandar) ===
pm2 delete all
pm2 start /home/ubuntu/n8n-ecosystem.config.js
pm2 save

# === AUTO-START ===
pm2 startup                             # Genera comando para systemd
pm2 save                                # Guarda lista actual de procesos

# === METRICAS ===
pm2 describe n8n                        # Info detallada
pm2 reset n8n                           # Reset metricas
pm2 jlist                               # Output JSON
```

### 4.3 Backup de N8N

**REGLA:** Backup diario automatico + verificacion semanal manual.

**Script de backup automatico:**

```bash
#!/bin/bash
# /home/ubuntu/scripts/backup-n8n.sh

BACKUP_DIR="/home/ubuntu/backups/n8n"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="n8n-backup-${DATE}.tar.gz"
RETENTION_DAYS=14

# Crear directorio si no existe
mkdir -p "$BACKUP_DIR"

# Hacer backup
echo "Iniciando backup de N8N..."
tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" -C /home/ubuntu .n8n/

# Verificar que se creo correctamente
if [ -f "${BACKUP_DIR}/${BACKUP_FILE}" ]; then
    SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}" | cut -f1)
    echo "Backup creado: ${BACKUP_FILE} (${SIZE})"
else
    echo "ERROR: Backup fallo"
    exit 1
fi

# Subir a Google Drive via rclone (configurar previamente)
# rclone copy "${BACKUP_DIR}/${BACKUP_FILE}" gdrive:Addendo/n8n-backups/

# Eliminar backups locales > RETENTION_DAYS dias
find "$BACKUP_DIR" -name "n8n-backup-*.tar.gz" -mtime +${RETENTION_DAYS} -delete

echo "Backup completado: ${BACKUP_FILE}"
```

**Configurar cron job:**

```bash
# Editar crontab del usuario ubuntu
crontab -e

# Agregar linea (corre todos los dias a las 3am):
0 3 * * * /home/ubuntu/scripts/backup-n8n.sh >> /home/ubuntu/scripts/backup.log 2>&1
```

### 4.4 Restauracion de N8N

**Procedimiento para restaurar desde backup:**

```bash
# 1. Detener N8N
pm2 stop n8n

# 2. Hacer backup de seguridad de la version actual
mv ~/.n8n ~/.n8n.broken-$(date +%Y%m%d)

# 3. Restaurar desde backup
cd /home/ubuntu
tar -xzf /path/to/n8n-backup-YYYYMMDD-HHMMSS.tar.gz

# 4. Verificar permisos
ls -la ~/.n8n/

# 5. Iniciar N8N
pm2 start n8n

# 6. Verificar logs
pm2 logs n8n --lines 50

# 7. Probar acceso a https://n8n.addendo.io
curl -I https://n8n.addendo.io
```

### 4.5 Recuperacion automatica

**Que pasa cuando algo falla:**

```
ESCENARIO 1: N8N crashea
  → PM2 lo reinicia automaticamente
  → Si crashea > 5 veces en 1 minuto, PM2 lo deja detenido
  → Notificacion al admin@addendo.io

ESCENARIO 2: PM2 crashea
  → systemd lo reinicia (configurado con pm2 startup)
  → Comando manual: sudo systemctl restart pm2-ubuntu

ESCENARIO 3: El servidor se reinicia
  → systemd inicia PM2
  → PM2 inicia los procesos guardados con pm2 save
  → N8N esta corriendo en < 30 segundos

ESCENARIO 4: Disco lleno
  → N8N puede dejar de funcionar
  → Limpiar logs y backups viejos
  → Si esta cronico: aumentar disco

ESCENARIO 5: SSL expirado
  → N8N sigue corriendo pero https no funciona
  → sudo certbot renew
  → sudo systemctl reload nginx
```

---

## FASE 5 — GESTION DE CLOUDFLARE

### 5.1 Cuenta y zonas

```
CUENTA: admin@addendo.io
PLAN: Free (suficiente para Addendo)

ZONAS (DOMINIOS) GESTIONADAS:
  - addendo.io                       (Addendo principal)
  - {{cliente1}}.com                 (cliente activo)
  - {{cliente2}}.com                 (cliente activo)
  - ... (otros clientes)
```

### 5.2 DNS de addendo.io (referencia)

```
RECORDS ACTUALES:

A     addendo.io           → 76.76.21.21 (Vercel)         [proxy ON]
CNAME www                  → cname.vercel-dns.com           [proxy ON]
A     n8n                  → 18.233.117.68 (EC2)            [proxy OFF]
MX    addendo.io           → (Google Workspace si aplica)
TXT   addendo.io           → SPF, DKIM, DMARC

NOTA IMPORTANTE:
  n8n.addendo.io tiene proxy OFF (gray cloud).
  Razon: para que Let's Encrypt pueda renovar SSL directamente.
  Si pones proxy ON, hay que usar Cloudflare SSL en lugar de Let's Encrypt.
```

### 5.3 Agregar dominio nuevo de cliente

**Procedimiento paso a paso:**

```
PASO 1: COMPRAR/TRANSFERIR DOMINIO
  Opcion A: comprar en Cloudflare Registrar (mejor precio, sin markup)
  Opcion B: transferir desde otro registrar
  Opcion C: si el cliente ya tiene en otro lugar, agregar como zona

PASO 2: AGREGAR ZONA EN CLOUDFLARE
  1. Login a Cloudflare Dashboard
  2. Click "Add Site"
  3. Ingresar: clientedomain.com
  4. Seleccionar plan: Free
  5. Cloudflare escanea DNS existente
  6. Cloudflare da nameservers (ej: alex.ns.cloudflare.com, jane.ns.cloudflare.com)

PASO 3: CONFIGURAR NAMESERVERS (si esta en otro registrar)
  En el registrar actual:
  - Cambiar nameservers a los que dio Cloudflare
  - Esperar propagacion (1-24 horas)

PASO 4: CONFIGURAR DNS RECORDS
  Para cliente con sitio en Vercel:
  
  Type: A
  Name: @ (root)
  Content: 76.76.21.21
  Proxy: ON (orange cloud)
  TTL: Auto
  
  Type: CNAME
  Name: www
  Content: cname.vercel-dns.com
  Proxy: ON
  TTL: Auto

PASO 5: SSL/TLS
  En Cloudflare > SSL/TLS > Overview:
  - Mode: Full (Strict)
  
  En SSL/TLS > Edge Certificates:
  - Always Use HTTPS: ON
  - HTTP Strict Transport Security (HSTS): Enable
  - Minimum TLS Version: 1.2
  - Automatic HTTPS Rewrites: ON

PASO 6: AGREGAR DOMINIO EN VERCEL
  1. Login a Vercel
  2. Project > Settings > Domains
  3. Add domain: clientedomain.com
  4. Vercel verifica DNS automaticamente
  5. Espera unos minutos
  6. Estado debe ser "Valid"

PASO 7: VERIFICAR QUE FUNCIONA
  curl -I https://clientedomain.com
  Esperado: HTTP/2 200
  
  Verificar en navegador:
  - HTTPS funciona
  - Certificado valido
  - Sitio carga correctamente

PASO 8: CONFIGURAR SEGURIDAD ADICIONAL
  Cloudflare > Security > WAF: ON con managed rules
  Cloudflare > Security > Bots > Bot Fight Mode: ON
  Cloudflare > Security > DDoS: automatica (no requiere config)

PASO 9: DOCUMENTAR
  En la carpeta Drive del cliente:
  /Addendo/Clientes/{{cliente}}/04-Sitio-Web/cloudflare-config.md
  
  Anotar:
  - Zone ID
  - Nameservers
  - DNS records configurados
  - Fecha de configuracion
```

### 5.4 Configuraciones de seguridad standard

```
PARA TODAS LAS ZONAS DE CLIENTES:

SSL/TLS:
  Mode:                        Full (Strict)
  Min TLS Version:             1.2
  TLS 1.3:                     ON
  Always Use HTTPS:            ON
  HSTS:                        Enabled (max-age 6 months)
  Automatic HTTPS Rewrites:    ON

Security:
  Security Level:              Medium
  Bot Fight Mode:              ON
  Browser Integrity Check:     ON
  Challenge Passage:           30 minutos
  Privacy Pass:                ON

WAF:
  Cloudflare Managed Ruleset:  ON
  Cloudflare OWASP Core:       ON (sensitivity: low)

Speed:
  Auto Minify:                 HTML, CSS, JS todos ON
  Brotli:                      ON
  Rocket Loader:               OFF (puede romper sitios)
  Mirage:                      ON (image optimization)
  Polish:                      Lossy

Caching:
  Browser Cache TTL:           4 hours
  Always Online:               ON

Network:
  HTTP/2:                      ON
  HTTP/3 (QUIC):               ON
  WebSockets:                  ON
  Pseudo IPv4:                 OFF
```

### 5.5 Manejo de DDoS

```
QUE PASA EN UN ATAQUE DDOS:

CLOUDFLARE LO MANEJA AUTOMATICAMENTE EN LA MAYORIA DE CASOS.

Si se detecta ataque grande:
  1. Cloudflare activa proteccion automatica
  2. Notifica via email
  3. Muestra "Checking your browser" challenge a sospechosos

Si necesitas accion manual:
  1. Login a Cloudflare Dashboard
  2. Security > Settings
  3. Activar "I'm Under Attack" mode
  4. Esto fuerza JS challenge a TODOS los visitantes
  5. Bloqueas el ataque pero algunos usuarios reales tendran problemas
  6. Mantener activo solo durante el ataque
  7. Volver a Medium una vez termine

EN ATAQUES DIRIGIDOS A IPs ESPECIFICAS:
  Si atacan al servidor EC2 directamente (bypassing Cloudflare):
  1. Verificar que UFW solo tiene puertos 22, 80, 443 abiertos
  2. Considerar: cambiar puerto SSH a uno no estandar (ej: 22022)
  3. Considerar: usar AWS Shield Standard (gratis con EC2)
  4. Para ataques persistentes: AWS Shield Advanced ($3000/mes — solo si es critico)
```

---

## FASE 6 — SEGURIDAD DEL SERVIDOR

### 6.1 Configuracion actual

```
USUARIO Y ACCESO:
  Usuario principal:    ubuntu
  Sudo:                 sin password (configurado en /etc/sudoers.d/)
  Root login:           DESACTIVADO
  Password auth:        DESACTIVADO (solo SSH key)
  SSH port:             22 (default — considerar cambiar)

UFW (FIREWALL):
  Default incoming:     deny
  Default outgoing:     allow
  Reglas:
    - 22/tcp ALLOW    (SSH)
    - 80/tcp ALLOW    (HTTP - redirect a HTTPS)
    - 443/tcp ALLOW   (HTTPS)

FAIL2BAN:
  Servicio:             activo
  Jail principal:       sshd
  bantime:              1h (3600 segundos)
  findtime:             10 minutos
  maxretry:             5 intentos
  IP whitelist:         71.47.42.178 (oficina/casa de Jose)

SSH CONFIG:
  /etc/ssh/sshd_config:
    PermitRootLogin no
    PasswordAuthentication no
    PubkeyAuthentication yes
    PermitEmptyPasswords no
    ChallengeResponseAuthentication no
    UsePAM yes
    X11Forwarding no
    PrintMotd no
    AcceptEnv LANG LC_*
    Subsystem sftp /usr/lib/openssh/sftp-server
    ClientAliveInterval 300
    ClientAliveCountMax 2
```

### 6.2 Endurecimiento adicional recomendado

```
MEJORAS PENDIENTES (TODO):

[ ] CAMBIAR PUERTO SSH A UNO NO ESTANDAR
    Razon: reduce 99% de los bots automaticos
    
    Como:
    1. sudo nano /etc/ssh/sshd_config
    2. Cambiar: Port 22 → Port 2222 (o cualquier otro)
    3. Actualizar UFW: sudo ufw allow 2222/tcp && sudo ufw delete allow 22/tcp
    4. Reiniciar SSH: sudo systemctl restart ssh
    5. NO cerrar la sesion actual hasta verificar que funciona el nuevo puerto
    6. Probar desde otra terminal: ssh -i key.pem -p 2222 ubuntu@18.233.117.68

[ ] HABILITAR UNATTENDED-UPGRADES
    Razon: actualiza parches de seguridad automaticamente
    
    sudo apt install unattended-upgrades
    sudo dpkg-reconfigure -plow unattended-upgrades

[ ] CONFIGURAR AUDITORIA CON AUDITD
    Razon: registra TODAS las acciones del sistema
    
    sudo apt install auditd
    sudo systemctl enable auditd

[ ] CONFIGURAR AIDE (intrusion detection)
    Razon: detecta cambios no autorizados a archivos del sistema
    
    sudo apt install aide
    sudo aideinit

[ ] CONFIGURAR MFA EN AWS CONSOLE
    Razon: protege la cuenta de AWS
    
    Habilitar MFA en el root user de AWS
    Crear IAM users para acceso normal (no usar root)
```

### 6.3 Revision semanal de seguridad

```
CADA LUNES, EJECUTAR Y REVISAR:

# 1. Intentos fallidos de SSH
sudo grep "Failed password" /var/log/auth.log | wc -l
sudo grep "Failed password" /var/log/auth.log | tail -20

# 2. IPs baneadas
sudo fail2ban-client status sshd

# 3. Conexiones SSH exitosas
sudo grep "Accepted publickey" /var/log/auth.log | tail -10

# 4. Comandos sudo ejecutados
sudo grep "sudo" /var/log/auth.log | grep -v "session opened\|session closed" | tail -20

# 5. Updates de seguridad disponibles
sudo apt update
sudo apt list --upgradable | grep -i security

# 6. Procesos no estandar
ps aux | grep -v "^root\|^ubuntu" | grep -v COMMAND

# 7. Puertos escuchando
sudo netstat -tlnp
# o
sudo ss -tlnp

# 8. Conexiones establecidas
sudo netstat -an | grep ESTABLISHED | wc -l

# 9. Espacio en disco (puede esconder problemas)
df -h
sudo du -sh /var/log/* | sort -h

# 10. Verificar SSL
sudo certbot certificates
```

### 6.4 Respuesta a incidentes

**Playbook por escenario:**

```
ESCENARIO 1: INTRUSION DETECTADA (login no autorizado)

PASO 1: AISLAR
  1. Inmediatamente desconectar del internet:
     - AWS Console > EC2 > Security Groups
     - Editar SG > Bloquear todo trafico inbound EXCEPTO tu IP
  
  2. Documentar la hora exacta del descubrimiento

PASO 2: PRESERVAR EVIDENCIA
  1. Crear snapshot de AMI INMEDIATAMENTE
     aws ec2 create-image --instance-id i-01a77ac99199e45e2 \
       --name "addendo-incident-$(date +%Y%m%d-%H%M%S)" \
       --no-reboot
  
  2. NO reiniciar el servidor (perderias evidencia en RAM)
  3. Capturar logs:
     sudo cp /var/log/auth.log /tmp/auth-incident.log
     sudo cp /var/log/syslog /tmp/syslog-incident.log
     sudo journalctl --since "today" > /tmp/journal-incident.log

PASO 3: INVESTIGAR
  - ¿Como entraron? (auth.log)
  - ¿Que hicieron? (history, bash_history)
  - ¿Que se modifico? (find / -mtime -1)
  - ¿Hay malware? (clamscan, rkhunter)

PASO 4: REMEDIAR
  Opcion A (incidente menor):
  - Cambiar SSH keys
  - Banear IPs atacantes
  - Volver a habilitar acceso normal
  
  Opcion B (incidente serio):
  - Crear NUEVA instancia desde AMI limpio
  - Asignar IP elastica a nueva instancia
  - Restaurar backup de N8N
  - Destruir instancia comprometida

PASO 5: NOTIFICAR
  - Jose inmediatamente
  - Si data de clientes comprometida: notificar a clientes (GDPR)
  - Documentar todo en /home/ubuntu/INCIDENTS.md

PASO 6: PREVENIR FUTURAS
  - Identificar el vector de entrada
  - Cerrar el vector
  - Mejorar monitoreo
  - Documentar leccion aprendida

---

ESCENARIO 2: SERVIDOR CAIDO

PASO 1: VERIFICAR QUE ESTA CAIDO
  ping 18.233.117.68
  curl -I https://n8n.addendo.io

PASO 2: VERIFICAR EN AWS CONSOLE
  - Status de la instancia (running?)
  - Status checks (passed?)
  - CloudWatch metrics

PASO 3: SI INSTANCIA ESTA STOPPED
  AWS Console > EC2 > Start Instance

PASO 4: SI INSTANCIA ESTA RUNNING PERO NO RESPONDE
  Opcion A: Reboot via AWS Console
  Opcion B: Acceder via Session Manager (no requiere SSH)
  Opcion C: Si nada funciona: detener, montar volumen en otra instancia, recuperar datos

PASO 5: SI EL DAÑO ES IRRECUPERABLE
  Plan de recuperacion total (Fase 7)

---

ESCENARIO 3: DDOS AL SERVIDOR

PASO 1: CONFIRMAR ATAQUE
  - Cloudflare Analytics > Traffic
  - sudo netstat -an | grep :443 | wc -l (conexiones TCP)
  - top → CPU al 100%

PASO 2: ACTIVAR PROTECCIONES
  - Cloudflare > Security > "I'm Under Attack" mode
  - Esperar que Cloudflare absorba el trafico

PASO 3: MITIGAR EN EL ORIGEN
  Si el ataque pasa Cloudflare (raro pero posible):
  - Actualizar Security Group para bloquear rangos de IPs atacantes
  - Considerar cambiar IP elastica temporalmente

PASO 4: REVISAR LOGS Y APRENDER
  Despues del ataque:
  - Revisar Cloudflare WAF events
  - Ajustar reglas WAF si se identifico patron
  - Considerar AWS Shield Advanced si los ataques son recurrentes
```

---

## FASE 7 — BACKUPS Y RECUPERACION ANTE DESASTRES

### 7.1 Estrategia de backups (3-2-1 rule)

```
REGLA 3-2-1:
  3 copias de los datos
  2 medios diferentes
  1 copia offsite

APLICADO A ADDENDO:

DATOS A RESPALDAR:
  - Config de N8N: ~/.n8n/
  - Configs de Nginx: /etc/nginx/
  - Configs de Fail2ban: /etc/fail2ban/
  - Certificados SSL: /etc/letsencrypt/
  - Documentacion: /home/ubuntu/docs/
  - Scripts: /home/ubuntu/scripts/

3 COPIAS:
  Copia 1: Original en el servidor EC2
  Copia 2: AMI snapshot en AWS (mismo servicio diferente layer)
  Copia 3: Backup tar.gz en Google Drive (offsite, otro provider)

2 MEDIOS DIFERENTES:
  Medio 1: AWS (snapshots + EBS)
  Medio 2: Google Drive (almacenamiento de archivos)

1 COPIA OFFSITE:
  Google Drive cuenta como offsite (no AWS)
```

### 7.2 Backups automatizados

```
SCRIPT DE BACKUP DIARIO:
  Ubicacion: /home/ubuntu/scripts/backup-n8n.sh
  Cron: 0 3 * * * (todos los dias 3am UTC)
  Retencion local: 14 dias
  Retencion en Drive: 90 dias

SCRIPT DE BACKUP DE CONFIGS (semanal):
  Ubicacion: /home/ubuntu/scripts/backup-configs.sh
  Cron: 0 4 * * 0 (domingos 4am UTC)
  Contenido: nginx, fail2ban, ufw, certbot, sshd

SNAPSHOT DE AMI (mensual):
  Comando: aws ec2 create-image
  Cron: 0 5 1 * * (primer dia del mes 5am UTC)
  Retencion: 6 meses
```

**Script de backup de configs:**

```bash
#!/bin/bash
# /home/ubuntu/scripts/backup-configs.sh

BACKUP_DIR="/home/ubuntu/backups/configs"
DATE=$(date +%Y%m%d)
BACKUP_FILE="configs-${DATE}.tar.gz"

mkdir -p "$BACKUP_DIR"

sudo tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" \
  /etc/nginx/ \
  /etc/fail2ban/ \
  /etc/ufw/ \
  /etc/letsencrypt/ \
  /etc/ssh/sshd_config \
  /home/ubuntu/n8n-ecosystem.config.js \
  /home/ubuntu/scripts/ \
  2>/dev/null

# Cambiar ownership
sudo chown ubuntu:ubuntu "${BACKUP_DIR}/${BACKUP_FILE}"

echo "Configs backup created: ${BACKUP_FILE}"

# Rotacion (mantener 8 semanas)
find "$BACKUP_DIR" -name "configs-*.tar.gz" -mtime +56 -delete
```

### 7.3 Tiempos de recuperacion (RTO)

```
| Escenario | RTO Objetivo | Procedimiento |
|-----------|--------------|---------------|
| N8N caido | < 5 min | pm2 restart n8n |
| PM2 caido | < 5 min | sudo systemctl restart pm2-ubuntu |
| Servidor unresponsive | < 30 min | reboot via AWS Console |
| Servidor corrupto | < 1 hora | nueva instancia desde AMI + restore N8N |
| Perdida total | < 2 horas | reconstruccion completa desde cero |
| Datos corruptos | < 1 hora | restore desde backup en Drive |
```

### 7.4 Procedimiento de recuperacion total

```
SI EL SERVIDOR DESAPARECE COMPLETAMENTE:

PASO 1: CREAR NUEVA INSTANCIA EC2 (15 min)
  
  1. AWS Console > EC2 > Launch Instance
  2. Name: addendo-server-NEW
  3. AMI: ami-05d16f722e5afdb80 (Addendo pre-hardening)
     SI no tienes AMI: Ubuntu 24.04 LTS oficial
  4. Instance type: t3.small
  5. Key pair: addendo-server-key
  6. Network: VPC default, public subnet
  7. Security Group: addendo-ec2-sg (existente)
  8. Storage: 30 GB gp3
  9. Launch
  
  Esperar que pase status checks (~3 min)

PASO 2: REASIGNAR IP ELASTICA (2 min)
  
  1. AWS Console > EC2 > Elastic IPs
  2. Seleccionar 18.233.117.68
  3. Actions > Disassociate (de la instancia vieja si existe)
  4. Actions > Associate
  5. Resource type: Instance
  6. Instance: addendo-server-NEW
  7. Associate
  
  Verificar:
  ssh -i ~/Desktop/addendo-server-key.pem ubuntu@18.233.117.68

PASO 3: SI USASTE AMI DE ADDENDO (mas rapido)
  El servidor ya tiene todo instalado:
  - Nginx
  - PM2
  - Node.js
  - N8N
  - Claude Code
  - Certbot
  - Fail2ban
  - UFW
  
  Solo necesitas restaurar los datos de N8N:
  
  PASO 4 (con AMI): RESTAURAR N8N (10 min)
  
  # Descargar el ultimo backup
  cd /home/ubuntu
  
  # Si tienes rclone configurado:
  rclone copy gdrive:Addendo/n8n-backups/n8n-backup-LATEST.tar.gz .
  
  # O subir manualmente desde tu Mac:
  # scp -i ~/Desktop/addendo-server-key.pem ~/backups/n8n-backup.tar.gz ubuntu@18.233.117.68:/home/ubuntu/
  
  # Restaurar
  pm2 stop n8n
  rm -rf ~/.n8n  # CUIDADO: solo si seguro
  tar -xzf n8n-backup-LATEST.tar.gz
  pm2 start n8n
  
  PASO 5 (con AMI): VERIFICAR (5 min)
  
  curl -I https://n8n.addendo.io
  pm2 status
  pm2 logs n8n --lines 50
  
  Tiempo total con AMI: ~32 minutos

PASO 3 ALTERNATIVO: SI USASTE UBUNTU FRESH (mas largo)
  
  Necesitas instalar TODO desde cero. Usar este script:
```

**Script de instalacion completa:**

```bash
#!/bin/bash
# install-addendo-server.sh
# Reconstruye un servidor de Addendo desde Ubuntu 24.04 fresco

set -e  # exit on error

echo "=== Iniciando instalacion del servidor Addendo ==="

# 1. Actualizar sistema
echo "→ Actualizando sistema..."
sudo apt update
sudo apt upgrade -y

# 2. Instalar paquetes basicos
echo "→ Instalando paquetes basicos..."
sudo apt install -y \
  curl \
  wget \
  git \
  vim \
  htop \
  ufw \
  fail2ban \
  nginx \
  certbot \
  python3-certbot-nginx \
  clamav \
  clamav-daemon \
  unattended-upgrades

# 3. Instalar Node.js LTS
echo "→ Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Instalar PM2 globalmente
echo "→ Instalando PM2..."
sudo npm install -g pm2

# 5. Instalar N8N globalmente
echo "→ Instalando N8N..."
sudo npm install -g n8n

# 6. Instalar Claude Code
echo "→ Instalando Claude Code..."
sudo npm install -g @anthropic-ai/claude-code

# 7. Configurar UFW
echo "→ Configurando firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# 8. Configurar Fail2ban
echo "→ Configurando Fail2ban..."
sudo tee /etc/fail2ban/jail.local > /dev/null <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
ignoreip = 127.0.0.1/8 ::1 71.47.42.178

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
EOF
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

# 9. Configurar SSH (hardening)
echo "→ Hardening SSH..."
sudo sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# 10. Configurar Nginx para N8N
echo "→ Configurando Nginx..."
sudo tee /etc/nginx/sites-available/n8n > /dev/null <<'EOF'
server {
    listen 80;
    server_name n8n.addendo.io;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 86400;
    }
}
EOF
sudo ln -sf /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 11. Configurar SSL con Let's Encrypt
echo "→ Configurando SSL..."
sudo certbot --nginx -d n8n.addendo.io --non-interactive --agree-tos --email admin@addendo.io --redirect

# 12. Configurar PM2 para auto-start
echo "→ Configurando PM2 auto-start..."
pm2 startup systemd -u ubuntu --hp /home/ubuntu
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "=== Instalacion base completa ==="
echo ""
echo "PROXIMOS PASOS MANUALES:"
echo "1. Crear /home/ubuntu/n8n-ecosystem.config.js con la config correcta"
echo "2. Restaurar ~/.n8n/ desde backup"
echo "3. Iniciar N8N: pm2 start /home/ubuntu/n8n-ecosystem.config.js"
echo "4. Guardar config PM2: pm2 save"
echo "5. Verificar: curl -I https://n8n.addendo.io"
```

---

## FASE 8 — MONITOREO Y ALERTAS

### 8.1 Metricas a monitorear

```
NIVEL 1 - CRITICAS (alertan despertar a las 3am):

[ ] Servidor up/down
    Como: ping + HTTP check
    Frequency: cada 1 minuto
    Tool: UptimeRobot
    Alert if: down por > 2 minutos

[ ] N8N up/down
    Como: HTTP GET https://n8n.addendo.io
    Frequency: cada 5 minutos
    Tool: UptimeRobot
    Alert if: down o status != 200

[ ] SSL valido
    Como: openssl check de fecha
    Frequency: diario
    Tool: cron job + email
    Alert if: < 30 dias hasta expiry

[ ] Disco lleno
    Como: df -h cada 30 min via cron
    Tool: cron + email
    Alert if: > 90%

NIVEL 2 - IMPORTANTES (alertan en horario laboral):

[ ] CPU alto sostenido
    Como: vmstat o CloudWatch
    Tool: CloudWatch
    Alert if: > 80% por 10 min consecutivos

[ ] Memoria alta
    Como: free -h cron
    Tool: cron
    Alert if: > 85%

[ ] Disco creciendo
    Como: trend analysis
    Alert if: > 80%

[ ] Multiples intentos de SSH
    Como: grep auth.log
    Alert if: > 50 intentos en 1 hora

[ ] Backup fallido
    Como: verificar exit code del cron
    Alert if: cron job fallo

NIVEL 3 - INFORMATIVAS (revisar semanalmente):

[ ] Updates pendientes
[ ] Logs de errores acumulados
[ ] Trafico inusual
[ ] Costo de AWS
```

### 8.2 Configurar UptimeRobot

```
ACCESO: https://uptimerobot.com (cuenta gratis: 50 monitors)

MONITORS A CREAR:

Monitor 1: Servidor EC2 (Ping)
  Type: Ping
  URL: 18.233.117.68
  Interval: 5 minutos
  Alert: SMS + Email + WhatsApp

Monitor 2: N8N HTTPS
  Type: HTTPS
  URL: https://n8n.addendo.io
  Expected: status 200
  Interval: 5 minutos
  Alert: SMS + Email + WhatsApp

Monitor 3: Sitio Addendo
  Type: HTTPS
  URL: https://addendo.io
  Interval: 5 minutos
  Alert: Email

Monitor 4-N: Sitios de clientes
  Uno por cada cliente activo
  Configurar segun criticidad

ALERTAS:
  Configurar Alert Contacts:
  - Email: admin@addendo.io
  - SMS: numero de Jose
  - WhatsApp: via Twilio (si esta configurado)
  - Slack (opcional)
```

### 8.3 Script de monitoreo local

```bash
#!/bin/bash
# /home/ubuntu/scripts/health-check.sh
# Cron: */5 * * * * (cada 5 minutos)

ALERT_EMAIL="admin@addendo.io"
LOGFILE="/home/ubuntu/health-check.log"

check_disk() {
  USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
  if [ "$USAGE" -gt 90 ]; then
    echo "$(date): ALERT - Disk usage at ${USAGE}%" | tee -a "$LOGFILE"
    echo "Disk usage critical: ${USAGE}%" | mail -s "Addendo Server: Disk Alert" "$ALERT_EMAIL"
  fi
}

check_memory() {
  AVAIL=$(free -m | awk 'NR==2 {print $7}')
  if [ "$AVAIL" -lt 200 ]; then
    echo "$(date): ALERT - Memory low: ${AVAIL}MB available" | tee -a "$LOGFILE"
    echo "Memory low: ${AVAIL}MB available" | mail -s "Addendo Server: Memory Alert" "$ALERT_EMAIL"
  fi
}

check_n8n() {
  STATUS=$(pm2 list | grep n8n | awk '{print $10}')
  if [ "$STATUS" != "online" ]; then
    echo "$(date): ALERT - N8N is not online (status: $STATUS)" | tee -a "$LOGFILE"
    echo "N8N is not online: $STATUS" | mail -s "Addendo Server: N8N Down" "$ALERT_EMAIL"
    
    # Auto-restart attempt
    pm2 restart n8n
  fi
}

check_ssl() {
  DAYS=$(echo | openssl s_client -servername n8n.addendo.io -connect n8n.addendo.io:443 2>/dev/null | \
         openssl x509 -noout -dates | grep notAfter | cut -d= -f2 | xargs -I {} date -d {} +%s)
  NOW=$(date +%s)
  DAYS_LEFT=$(( (DAYS - NOW) / 86400 ))
  
  if [ "$DAYS_LEFT" -lt 30 ]; then
    echo "$(date): ALERT - SSL expires in ${DAYS_LEFT} days" | tee -a "$LOGFILE"
    echo "SSL expires in ${DAYS_LEFT} days" | mail -s "Addendo Server: SSL Expiring Soon" "$ALERT_EMAIL"
  fi
}

# Run all checks
check_disk
check_memory
check_n8n
check_ssl
```

**Configurar en cron:**

```bash
crontab -e

# Agregar:
*/5 * * * * /home/ubuntu/scripts/health-check.sh
```

### 8.4 CloudWatch (opcional para metricas avanzadas)

```
CONFIGURAR CLOUDWATCH AGENT:

1. Instalar agent:
   wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
   sudo dpkg -i amazon-cloudwatch-agent.deb

2. Configurar:
   sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard

3. Iniciar:
   sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
     -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json

METRICAS A ENVIAR:
  - Memory utilization
  - Disk utilization  
  - CPU utilization
  - Network I/O

ALARMAS A CONFIGURAR EN CLOUDWATCH:
  - CPU > 80% por 10 min
  - Memory > 85% por 10 min
  - Disk > 80%

NOTA: CloudWatch tiene costo. Solo configurar si las alertas basicas
      via cron + UptimeRobot no son suficientes.
```

---

## FASE 9 — COSTOS Y OPTIMIZACION

### 9.1 Costos actuales (referencia)

```
INFRAESTRUCTURA ADDENDO — COSTO MENSUAL:

AWS:
  EC2 t3.small (~730 hrs/mes):     $15.18/mes
  EBS storage (30 GB gp3):         $2.40/mes
  Elastic IP (asociada):           $0/mes
  Snapshots (~50 GB):              $5/mes
  Data transfer (estimado):        $1/mes
  Subtotal AWS:                    ~$23.58/mes

CLOUDFLARE:
  Plan Free:                       $0/mes
  Domains (registrar):             $10/ano cada uno (no mensual)
  Subtotal Cloudflare:             $0/mes

OTROS:
  N8N License:                     $0 (community edition)
  Claude Code:                     $0 (usa Claude API del usuario)
  Subtotal Otros:                  $0/mes

TOTAL MENSUAL: ~$23.58/mes

COMPARATIVA:
  Heroku equivalent:               ~$50/mes
  DigitalOcean equivalent:         ~$30/mes
  Self-hosted bare metal:          $0 + tiempo
  
  AWS es la opcion correcta por:
  - Snapshots faciles
  - Ampliacion sin downtime
  - Region us-east-1 (mejor latencia para clientes USA)
  - Integracion futura con S3, Route53, CloudFront
```

### 9.2 Optimizacion de costos

```
COSAS QUE PUEDES HACER PARA REDUCIR COSTO:

[ ] LIMPIAR SNAPSHOTS VIEJOS
    Mantener solo:
    - 7 dias diarios
    - 4 semanas semanales
    - 6 meses mensuales
    
    Comando:
    aws ec2 describe-snapshots --owner-ids self \
      --query 'Snapshots[?StartTime<`2024-01-01`].SnapshotId' \
      --output text | xargs -n 1 aws ec2 delete-snapshot --snapshot-id

[ ] LIMPIAR LOGS LOCALES
    pm2 flush
    sudo journalctl --vacuum-time=14d
    sudo find /var/log -name "*.gz" -mtime +30 -delete

[ ] REVISAR DISCO Y REDUCIR SI ES POSIBLE
    Si usas < 50% del disco actual, podrias bajar de 30 GB a 20 GB
    (requiere migracion compleja, no recomendado a menos que sea necesario)

[ ] EVALUAR CLOUDWATCH
    Solo enviar metricas que realmente revisas
    Cada metrica custom = $0.30/mes
```

### 9.3 Cuando escalar (criterios objetivos)

```
ESCALAR A t3.medium ($30/mes) SI:

[ ] CPU > 70% sostenido por > 30 dias consecutivos
    Verificar con: vmstat 60 100 | awk '{print $13}' (% idle)

[ ] Memoria > 80% sostenido
    Verificar con: free -h regularmente, anotar tendencia

[ ] N8N tiene > 30 workflows activos pesados
    Verificar con: PM2 metrics

[ ] Ejecuciones de N8N > 10,000/dia
    Verificar en N8N Dashboard

ESCALAR A t3.large ($60/mes) SI:

[ ] Mas de 10 clientes activos con muchos workflows
[ ] Necesidad de procesar grandes volumenes de datos
[ ] Workflows con uso intensivo de CPU (procesamiento de imagenes, etc.)

AMPLIAR DISCO SI:

[ ] Disco > 70% sostenido despues de limpieza
[ ] N8N tiene muchos archivos binarios
[ ] Logs creciendo muy rapido

PROCEDIMIENTO PARA UPGRADE:

1. Crear snapshot AMI primero (siempre)
2. Stop instance (downtime ~5 min)
3. Cambiar instance type en AWS Console
4. Start instance
5. Verificar que todo funciona

NUNCA escalar:
  - "Por si acaso"
  - "Para tener mas potencia"
  - "Porque sobra presupuesto"
  
SI ESCALAR cuando:
  - Hay metricas que lo justifican
  - El cuello de botella es claro
  - El costo se justifica con valor entregado
```

### 9.4 Reporte mensual de infraestructura

**Enviar primer dia de cada mes a Jose:**

```markdown
# REPORTE MENSUAL DE INFRAESTRUCTURA — {{mes}} {{ano}}

**Preparado por:** Agente #25 servidor-cloud
**Periodo:** {{fecha_inicio}} al {{fecha_fin}}

---

## RESUMEN EJECUTIVO

| Metrica | Valor |
|---------|-------|
| Uptime servidor | {{%}} |
| Uptime N8N | {{%}} |
| Incidentes totales | {{N}} |
| Incidentes criticos | {{N}} |
| Costo total | ${{monto}} |

## DISPONIBILIDAD

- **Servidor EC2:** {{%}} uptime ({{N}} minutos de downtime)
- **N8N:** {{%}} uptime
- **Sitios de clientes:** {{%}} uptime promedio

## INCIDENTES

{{Si hay incidentes:}}

### Incidente #1: {{titulo}}
- Fecha: {{fecha}}
- Duracion: {{minutos}}
- Causa: {{descripcion}}
- Resolucion: {{accion}}
- Prevencion futura: {{medida}}

{{Si no hay incidentes:}}
✅ Cero incidentes este mes.

## ACCIONES TOMADAS

1. {{accion 1}}
2. {{accion 2}}
3. {{accion 3}}

## ACTUALIZACIONES APLICADAS

- Sistema operativo: {{updates aplicados}}
- N8N: {{version anterior → version actual}}
- Claude Code: {{version}}
- Otros: {{lista}}

## BACKUPS

- Backups diarios: {{N}}/{{N}} exitosos
- Backup mensual: ✅ creado el {{fecha}}
- Test de restore: ✅ realizado el {{fecha}}

## SEGURIDAD

- Intentos de SSH bloqueados: {{N}}
- IPs baneadas por Fail2ban: {{N}}
- Vulnerabilidades parchadas: {{N}}
- Auditoria de seguridad: ✅ realizada

## METRICAS DE PERFORMANCE

- CPU promedio: {{%}}
- CPU peak: {{%}}
- Memoria promedio: {{%}}
- Disco usado: {{%}}
- Trafico mensual: {{GB}}

## COSTOS

| Item | Costo |
|------|-------|
| EC2 t3.small | ${{monto}} |
| EBS storage | ${{monto}} |
| Snapshots | ${{monto}} |
| Data transfer | ${{monto}} |
| Cloudflare | $0 |
| **TOTAL** | **${{monto}}** |

## RECOMENDACIONES

1. {{recomendacion 1}}
2. {{recomendacion 2}}

## PROXIMO MES

- {{accion programada 1}}
- {{accion programada 2}}

---

*Reporte automatico generado por servidor-cloud (#25)*
```

---

## REGLAS MAESTRAS DEL SKILL

1. **La infraestructura que no se monitorea va a fallar.** Monitoreo diario obligatorio.

2. **La seguridad es el fundamento, no un feature.** Cada cambio se evalua por su impacto en seguridad.

3. **Los backups no existen hasta que se prueban.** Test restore mensual obligatorio.

4. **El servidor debe poder reconstruirse en < 1 hora.** Documentacion + scripts + AMI.

5. **Simplicidad supera a complejidad.** 1 servidor + PM2 + Cloudflare es mejor que Kubernetes para PYMES.

6. **Logs centralizados, alertas automaticas.** Sin alertas = sin monitoreo real.

7. **Snapshot AMI antes de CUALQUIER cambio.** Reglas sin excepciones.

8. **SSH solo con key. Password authentication DESACTIVADO.**

9. **UFW con minimo de puertos abiertos.** 22, 80, 443. Nada mas sin justificacion.

10. **Fail2ban activo y monitoreado.** Revisar IPs banned semanal.

11. **HTTPS estricto con HSTS.** SSL/TLS Full (Strict) en Cloudflare.

12. **Cada cambio documentado en CHANGELOG.md.** Sin documentacion = sin existir.

13. **PM2 maneja N8N 24/7.** Auto-restart on crash. Auto-start on reboot.

14. **Backup diario de N8N a 2 ubicaciones.** Local + Google Drive offsite.

15. **Updates de seguridad automaticos.** unattended-upgrades activado.

16. **Sin cambios en produccion sin testing previo.** Probar primero en staging si es cambio mayor.

17. **Cloudflare Free es suficiente.** No pagar Plan Pro a menos que sea necesario.

18. **DNS de n8n.addendo.io con proxy OFF.** Para que Let's Encrypt pueda renovar SSL.

19. **Reporte mensual a Jose.** Sin excepcion.

20. **Auditoria de seguridad mensual.** Revisar todo lo que entra al servidor.

21. **Costos optimizados pero sin comprometer calidad.** $20/mes es barato para lo que entrega.

22. **Escalar solo con datos.** Cero "por si acaso" upgrades.

23. **AMI snapshot mensual.** Para reconstruccion rapida.

24. **Documentar TODO lo que se hace.** El proximo admin (humano o IA) debe poder entenderlo.

25. **Cero downtime no planeado.** Si hay maintenance, hacerlo en hora valle.
