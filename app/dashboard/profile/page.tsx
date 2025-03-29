import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Edit,
  Award,
  BookOpen,
  MessageCircle,
  Medal,
  Star,
  Calendar,
  Users,
  Gift,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  ChevronRight,
  Download,
  Share2,
  Camera,
  Utensils,
  Heart,
  Zap,
  Crown,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"


// Badge rarity types
type BadgeRarity = "common" | "rare" | "epic" | "mythic"

// Badge data with rarity
const badges = [
  {
    id: 1,
    name: "Connector",
    description: "5 connections",
    icon: <Users className="h-8 w-8" />,
    rarity: "common" as BadgeRarity,
  },
  {
    id: 2,
    name: "Learner",
    description: "3 workshops",
    icon: <BookOpen className="h-8 w-8" />,
    rarity: "common" as BadgeRarity,
  },
  {
    id: 3,
    name: "Helper",
    description: "2 people helped",
    icon: <Heart className="h-8 w-8" />,
    rarity: "rare" as BadgeRarity,
  },
  {
    id: 4,
    name: "Event Organizer",
    description: "Organized 2 events",
    icon: <Calendar className="h-8 w-8" />,
    rarity: "epic" as BadgeRarity,
  },

  {
    id: 5,
    name: "Bridge Builder",
    description: "Connected generations",
    icon: <Crown className="h-8 w-8" />,
    rarity: "mythic" as BadgeRarity,
  },
]

// Helper function to get badge rarity styles
function getBadgeRarityStyles(rarity: BadgeRarity) {
  switch (rarity) {
    case "common":
      return {
        background: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        label: "Common",
        labelBg: "bg-emerald-500",
      }
    case "rare":
      return {
        background: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        label: "Rare",
        labelBg: "bg-blue-500",
      }
    case "epic":
      return {
        background: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
        label: "Epic",
        labelBg: "bg-amber-500",
      }
    case "mythic":
      return {
        background: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        label: "Mythic",
        labelBg: "bg-purple-500",
      }
  }
}




export default function ProfilePage() {
  return (
      <div className="container px-4 py-6 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="icon" variant="ghost" asChild>
              <a href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </a>
            </Button>
          </div>
        </header>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/imad.jpeg?height=96&width=96" alt="Profile picture" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit profile picture</span>
            </Button>
          </div>
          <h2 className="text-xl font-bold">Imad Agjoud</h2>
          <p className="text-muted-foreground">22 years old • Young Person</p>

          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <Badge variant="secondary">Photography</Badge>
            <Badge variant="secondary">Coding</Badge>
            <Badge variant="secondary">History</Badge>
            <Badge variant="secondary">+3 more</Badge>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 flex-1 text-center border-b md:border-b-0 md:border-r">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center">
                    <div className="flex items-center justify-center bg-emerald-100 dark:bg-emerald-800 rounded-full w-7 h-7 mr-2">
                      <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-emerald-600 dark:text-emerald-300"
                      >
                        {/* Diamond shape */}
                        <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                      </svg>
                    </div>
                    250
                  </div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
              <div className="p-4 flex-1 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-primary mb-1">#42</div>
                  <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <Medal className="h-4 w-4" />
            <span>My Achievements</span>
          </Button>
          <Button className="gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>View Leaderboard</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Star className="h-5 w-5 text-accent mr-2" />
              Points Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span>Events Attended</span>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-emerald-600 dark:text-emerald-400">
                    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                  </svg>
                  <span>75</span>
                </Badge>
              </div>
              <Progress value={30} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-primary mr-2" />
                  <span>Connections Made</span>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-emerald-600 dark:text-emerald-400">
                    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                  </svg>
                  <span>60</span>
                </Badge>
              </div>
              <Progress value={24} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Gift className="h-4 w-4 text-primary mr-2" />
                  <span>Skills Shared</span>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-emerald-600 dark:text-emerald-400">
                    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                  </svg>
                  <span>80</span>
                </Badge>
              </div>
              <Progress value={32} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-primary mr-2" />
                  <span>Challenges Completed</span>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-emerald-600 dark:text-emerald-400">
                    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                  </svg>
                  <span>35</span>
                </Badge>
              </div>
              <Progress value={14} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">About Me</h3>
              <p className="text-sm text-muted-foreground">
                I'm a marketing professional interested in learning more about history and traditional crafts. I love
                photography and enjoy sharing my knowledge about digital marketing and social media.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">I can teach</h3>
              <p className="text-sm text-muted-foreground">
                Digital marketing, social media strategies, basic photography techniques
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">I want to learn</h3>
              <p className="text-sm text-muted-foreground">History, traditional crafts, baking, gardening tips</p>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Skills I can share</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Digital Marketing</h4>
                        <p className="text-xs text-muted-foreground">Intermediate</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Social Media</h4>
                        <p className="text-xs text-muted-foreground">Advanced</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Skills I'm learning</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">History</h4>
                        <p className="text-xs text-muted-foreground">Beginner</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Baking</h4>
                        <p className="text-xs text-muted-foreground">Beginner</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="mt-4 space-y-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                Earned Certificates
              </h3>

              <div className="space-y-4">
                <Card className="overflow-hidden border-2 border-emerald-500/20">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 relative">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-500 text-white">Earned</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full text-emerald-600 dark:text-emerald-300">
                        <Camera className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Photography Volunteer</h4>
                        <p className="text-sm text-muted-foreground">Earned on May 15, 2025</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Awarded for teaching photography skills to 5+ seniors and organizing 2 photography workshops for the
                      community.
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                        </svg>
                        <span className="font-medium">100 points earned</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Download className="h-3 w-3" />
                          <span className="text-xs">Download</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                          <Share2 className="h-3 w-3" />
                          <span className="text-xs">Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                Certificates in Progress
              </h3>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Digital Skills Mentor</h4>
                        <p className="text-sm text-muted-foreground">75% Complete</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Requirements:</h5>
                        <div className="space-y-1">
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <span>
                            Teach 3 digital skills workshops{" "}
                              <span className="text-emerald-500 font-medium">(Completed)</span>
                          </span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <span>
                            Help 5 seniors with technology{" "}
                              <span className="text-emerald-500 font-medium">(Completed)</span>
                          </span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <div className="h-4 w-4 border-2 border-muted-foreground rounded-full mt-0.5"></div>
                            <span>Create 1 digital skills guide for the community</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                          </svg>
                          <span>150 points reward</span>
                        </div>
                        <Button size="sm" className="h-8">
                          Continue Progress
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-muted rounded-full text-muted-foreground relative">
                        <Utensils className="h-8 w-8" />
                        <Lock className="h-4 w-4 absolute bottom-0 right-0 bg-background rounded-full p-0.5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Culinary Exchange Volunteer</h4>
                        <p className="text-sm text-muted-foreground">Locked - 200 points required</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Share culinary traditions across generations by teaching cooking skills and organizing
                        food-related events.
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Points needed</span>
                          <span>200/250</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        View Requirements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <h3 className="font-medium mb-2">How to Earn Certificates</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Certificates are awarded when you reach certain milestones in specific domains. They recognize your
                contributions to the community and can be shared on your resume or social media.
              </p>
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronRight className="h-4 w-4" />
                <span>Learn More</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">My Badges</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-muted-foreground">Common</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-muted-foreground">Rare</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-muted-foreground">Epic</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-muted-foreground">Mythic</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge) => {
                const styles = getBadgeRarityStyles(badge.rarity)
                return (
                    <Card key={badge.id} className={`overflow-hidden border-2 ${styles.border}`}>
                      <div className={`${styles.background} p-3 relative`}>
                        <Badge className={`absolute top-2 right-2 ${styles.labelBg} text-white text-xs`}>
                          {styles.label}
                        </Badge>
                        <div className="flex flex-col items-center text-center">
                          <div className={`p-3 rounded-full ${styles.background} ${styles.text} mb-2`}>{badge.icon}</div>
                          <h4 className="font-medium text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    </Card>
                )
              })}
            </div>

            <div className="text-center">
              <Button variant="outline" size="sm" className="gap-1">
                <Award className="h-4 w-4" />
                <span>View All Badges</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}


