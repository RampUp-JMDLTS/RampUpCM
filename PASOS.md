# INSTALANDO CONTAINER ENGINE Y COMMON
sudo apt install ca-certificates curl gnupg  -y


sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y containerd.io

sudo containerd config default | sudo tee /etc/containerd/config.toml > /dev/null
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml
sudo service containerd restart

### on system start
sudo systemctl enable containerd

### CHECK STATUS -> HANDLRES
sudo service containerd status 

# INSTLANDO KUBERNETES
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
sudo apt-add-repository -y "deb http://apt.kubernetes.io/ kubernetes-xenial main"
sudo apt-get update -y

<!-- Uso la 1.27 por que la ulktima es la 1.28 y quiero una que no este tan reciente -->
sudo apt-get install -y kubelet=1.27.0-00 kubectl=1.27.0-00 kubeadm=1.27.0-00
sudo apt-mark hold kubelet kubeadm kubectl

# IP FORWARDING
sudo modprobe overlay
sudo modprobe br_netfilter
sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
## make it persistant
echo br_netfilter | sudo tee /etc/modules-load.d/kubernetes.conf

sudo sysctl --system


--- 
# solo control plane

# INIT KUBERNETES CONTROL-PLANE
sudo kubeadm init

### fOR RUNNING AND USING KUBECTL
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml




kubeadm token create --print-join-command

sudo kubeadm join 10.0.5.5:6443 --token r85qwg.jpatsg563q2cuogl \
--discovery-token-ca-cert-hash sha256:9f796c185c743f2596ce9b0c747c9efc3a70ba3f3afe4ca2223bc19243e21259


### replace name
kubectl label node rp-ss-back1000000 node-role.kubernetes.io/worker=worker
