# WIP, IM WRITING THIS YET.
I'm using a docker image that i made in the [previous post](/post/containerizing-dotnet-core-api), in case you want to skip that you can use this. 
````text
TODO: ADD LINK HERE
````

## 0. Summary:  
### 1. Azure configuration:
  * 1.1 Create cluster
### 2. Kubernetes:
  * 2.1 Connect kubectl command cli to azure
  * 2.2 Creating a kube pod
  * 2.3 Creating a load ballancing service
  * 2.4 Creating a replication controller

## 1. Create Azure docker cluster
You can use the web interface or the command line, i will cover the cli only:

[Microsoft docs for azure-web](https://docs.microsoft.com/pt-br/azure/container-service/dcos-swarm/container-service-deployment)

[Microsoft docs for azure-cli](https://docs.microsoft.com/pt-br/azure/container-service/dcos-swarm/container-service-create-acs-cluster-cli)
````bash
python3 -m pip install azure-cli
````
Note this is python 3.5

This will connect your cli to your account, set your subscription, create a resource group and create a cluster in that resource group. Last step install kubectl.
````text
az login
az account list
az account set --subscription <the-id>
az group create -n acsrg1 -l "westus"
az acs create -n acs-cluster -g acsrg1 -d test-todo -t Kubernetes --agent-count 1

az acs kubernetes install-cli --install-location ~/bin/kubectl
````


TODO: completar esse passo com imagens

## 2.1 Connect kubectl command cli to azure
[Guide to install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) in case you had problems with the last step.

You will need a ssh-key in the next step, follow this guide if you don't know how to generate one: [how to generate shh key](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)

This will connect kubectl to your account and last command will test it:
````bash
az acs kubernetes get-credentials — resource-group=<cluster-resource-group> — name=<cluster-name> --ssh-key-file=<file-path>
kubectl get nodes
````
````text
TODO: INSERT IMAGE HERE
````
## 2.2 Creating a kube pod
A pod is a group of containers. The pods are created with a configuration file written in yaml.
````yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-simple-todo
  labels:
    name: api-simple-todo
spec:
  containers:
    - name: api-simple-todo
      image: your-name/api-simple-todo
      ports:
        - containerPort: 5000
      name: http-server
````
Now we create this pod with this command:
````bash
kubectl create –f pod.kube.yaml
kubectl get pods
````
````text
TODO: INSERT IMAGE HERE
````
## 2.3 Creating a load ballancer
Nice, it's done, but still needs a load ballancing service to expose the pod to the web, let's create that service, [notice there is a difference beteween services and pods](https://kubernetes.io/docs/concepts/services-networking/service/):
````yaml
apiVersion: v1
kind: Service
metadata:
  name: service1
  labels:
    name: service1
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 5000
      protocol: TCP
  selector:
    name: api-simple-todo
````
Start the service with:
````bash
kubectl create –f load-ballancer.kube.yaml
kubectl get services
````
````text
TODO: INSERT IMAGE HERE
````
That external ip is what we will use:

````text
TODO: INSERT IMAGE HERE POStMAn
````
## 2.4 Now all together, the replication controller
In a replication controller you set a desired number of pods and it will automagically create and mantain that number of pods, your container can crash and it will die and be replaced by another one.
````yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: api-simple-todo-rc
  labels:
    name: api-simple-todo-rc
spec:
  replicas: 2
    selector:
    name: api-simple-todo
  template:
    metadata:
      name: api-simple-todo
      labels:
        name: api-simple-todo
    spec:
      containers:
        - name: api-simple-todo-container
          image: yourname/api-simple-todo
          ports:
            - containerPort: 5000
          name: http-server
```` 
Let's delete our existing pod and service then run the replication controller:
````bash
kubectl delete –f pod.kube.yaml
kubectl delete -f load-ballancer.kube.yaml
kubectl create -f replication.kube.yaml
````
````text
TODO: INSERT IMAGE SHOW PODS AND RC
````
Delete a pod and see the replication controller create another one, magic!

Now we can use the same load ballancing service to expose our pods:
````bash
kubectl create –f load-ballancer.kube.yaml
kubectl describe services service1
````
````text
TODO: INSERT IMAGE SHOW describe
````

TALK ABOUT MONITORING AND SCALING
````bash
az login
az account list
az account set --subscription <the-id>
az group create -n acsrg1 -l "westus"
az acs create -n acs-cluster -g acsrg1 -d test-todo -t Kubernetes --agent-count 1

az acs kubernetes install-cli --install-location ~/bin/kubectl
az acs kubernetes get-credentials --resource-group=acsrg1 --name acs-cluster
kubectl get nodes

sudo docker login
sudo docker tag 73cbc1fd2307082482a24047e65e773795421894b61f288a150878edf329a83e  pedroraft/phidelis-api-test
sudo docker push pedroraft/phidelis-api-test

kubectl create -f kubernetes.yaml
kubectl get pods
kubectl delete --name phidelis-api-test

kubectl create -f load-ballancer.yaml 
kubectl get pods
kubectl get services
kubectl delete -f load-ballancer.yaml 
kubectl get services
kubectl delete -f kubernetes.yaml
kubectl delete --name phidelis-api-test
kubectl get services
kubectl get pods
kubectl delete pod.kube.yaml 
kubectl delete -f pod.kube.yaml 
kubectl delete -f load-ballancer.kube.yaml 
kubectl get pods
kubectl create -f replication.kube.yaml 
kubectl get pods
kubectl get rc
kubectl create -f load-ballancer.yaml 
kubectl create -f load-ballancer.kube.yaml 
kubectl describe services service1
kubectl get services
kubectl describe services service1
kubectl get pods
kubectl delete -f load-ballancer.kube.yaml 
kubectl get pods
kubectl get rc
kubectl delete -f replication.kube.yaml 
kubectl get rc
kubectl get pods
kubectl get services
xrandr
````
