nums=(1,2,4,6,8,9,6,4,3)
x=36
i=0

while i < len(nums):
    if(nums[i]==x):
        print("Found", i)
        break
    else:
        print("finding..")
    i+=1
print("end of loop")