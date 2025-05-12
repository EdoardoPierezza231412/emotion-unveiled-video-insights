
import React from "react";
import { BarChart, Languages, Bell, Palette, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navigation from "@/components/layout/Navigation";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <Card className="w-full md:w-3/4">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="languages">Languages</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Profile Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your basic profile details
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" defaultValue="Demo User" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your email" defaultValue="demo@example.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Appearance</h3>
                      <p className="text-sm text-muted-foreground">
                        Customize how the application looks
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="theme">Dark Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          Toggle between light and dark theme
                        </div>
                      </div>
                      <Switch id="theme" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="analysis">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Analysis Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure how videos are analyzed
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-process">Auto Process</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically start analysis when a video is uploaded
                        </div>
                      </div>
                      <Switch id="auto-process" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="high-precision">High Precision Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          More accurate but slower analysis (Premium only)
                        </div>
                      </div>
                      <Switch id="high-precision" disabled />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="frame-rate">Analysis Frame Rate</Label>
                      <p className="text-sm text-muted-foreground">
                        How many frames per second to analyze (lower is faster)
                      </p>
                      <Input id="frame-rate" type="number" defaultValue="5" min="1" max="30" />
                      <p className="text-xs text-muted-foreground">
                        Higher frame rates are available on Premium plans
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="languages">
                  <div className="space-y-6">
                    <div className="space-y-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Language Settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Configure language detection and translation
                        </p>
                      </div>
                      <Languages className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="primary-language">Primary Language</Label>
                      <select
                        id="primary-language"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-detect">Auto-detect Language</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically detect language in videos
                        </div>
                      </div>
                      <Switch id="auto-detect" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-translate">Auto-translate</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically translate to your primary language
                        </div>
                      </div>
                      <Switch id="auto-translate" disabled />
                    </div>
                    
                    <div className="p-4 bg-secondary rounded-md">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Languages className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Premium Feature</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Upgrade to Premium to unlock multilingual support with 10+ languages
                          </p>
                          <Button variant="outline" size="sm" className="mt-3">
                            Upgrade Plan
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <div className="space-y-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Notification Settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Configure when and how you receive notifications
                        </p>
                      </div>
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Analysis Completed</Label>
                          <div className="text-sm text-muted-foreground">
                            Get notified when video analysis is complete
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <div className="text-sm text-muted-foreground">
                            Receive email notifications for important events
                          </div>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Product Updates</Label>
                          <div className="text-sm text-muted-foreground">
                            Get notified about new features and improvements
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="account">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Account Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your account and subscription
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Current Plan: Free</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            5 videos per month, basic emotions only
                          </p>
                        </div>
                        <Button>Upgrade</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="change-password">Change Password</Label>
                        <Input id="change-password" type="password" placeholder="New password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirm password" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-destructive">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanent actions that cannot be undone
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Delete Account</h5>
                        <p className="text-sm text-muted-foreground">
                          This will permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Stats/Info Panel */}
          <div className="w-full md:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Videos Analyzed</span>
                    <span className="font-medium">3 / 5</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Storage Used</span>
                    <span className="font-medium">250 MB / 1 GB</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Plan Renews</span>
                  <span className="text-sm font-medium">Jun 15, 2025</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <BarChart className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Advanced Analytics</p>
                      <p className="text-xs text-muted-foreground">
                        Unlock detailed emotional patterns
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Languages className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">10+ Languages</p>
                      <p className="text-xs text-muted-foreground">
                        Analyze content in multiple languages
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Priority Support</p>
                      <p className="text-xs text-muted-foreground">
                        Get help when you need it
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button className="w-full" size="sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="bg-card border-t py-6 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-white font-semibold">EA</div>
              <span className="font-heading">Emotion AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Emotion AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
