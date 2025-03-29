"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  BookOpen,
  Camera,
  Utensils,
  Leaf,
  Users,
  Award,
  Lightbulb,
  Bookmark,
  ThumbsUp,
  Filter,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Bell,
  BellOff,
  ChevronLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfilePoints } from "@/components/profile-points"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-context"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [currentCommunityIndex, setCurrentCommunityIndex] = useState(0)
  const { t, dir } = useLanguage()

  // Suggested communities data
  const suggestedCommunities = [
    {
      name: t("community.digitalSkills"),
      description: t("community.digitalSkillsDesc"),
      members: 128,
      posts: 45,
      image: "/imagssdfes.jpeg?height=80&width=80",
      isNew: true,
    },
    {
      name: t("community.bookClub"),
      description: t("community.bookClubDesc"),
      members: 96,
      posts: 67,
      image: "/rpbook.avif?height=80&width=80",
    },
    {
      name: t("community.craftingCircle"),
      description: t("community.craftingCircleDesc"),
      members: 74,
      posts: 38,
      image: "/imagecrafts.jpeg?height=80&width=80",
      isNew: true,
    },
    {
      name: t("community.localHistory"),
      description: t("community.localHistoryDesc"),
      members: 112,
      posts: 89,
      image: "/0hystoru1.jpg?height=80&width=80",
    },
  ]

  const nextCommunity = () => {
    setCurrentCommunityIndex((prev) => (prev === suggestedCommunities.length - 1 ? 0 : prev + 1))
  }

  const prevCommunity = () => {
    setCurrentCommunityIndex((prev) => (prev === 0 ? suggestedCommunities.length - 1 : prev - 1))
  }

  return (
    <div className="container px-4 py-6 space-y-6" dir={dir}>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold app-logo mb-1">{t("common.appName")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <ProfilePoints points={250} initials="SJ" />
        </div>
      </header>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`}
          />
          <Input placeholder={t("community.searchPlaceholder")} className={dir === "rtl" ? "pr-9" : "pl-9"} />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
          <span className="sr-only">{t("community.filter")}</span>
        </Button>
      </div>

      <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed" className="text-base py-3">
            <TrendingUp className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("community.tabs.feed")}
          </TabsTrigger>
          <TabsTrigger value="browse" className="text-base py-3">
            <Users className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("community.tabs.browse")}
          </TabsTrigger>
        </TabsList>

        {/* FEED TAB */}
        <TabsContent value="feed" className="mt-4 space-y-4">
          {/* Featured post / Highlight - more compact */}
          <Card className="overflow-hidden border-2 border-primary/20">
            <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
              <img
                src="/IMG_5285.JPG.jpg?height=128&width=600"
                alt={t("community.featuredPost")}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <Badge className={`absolute top-2 ${dir === "rtl" ? "right-2" : "left-2"} bg-primary/90`}>
                {t("community.featured")}
              </Badge>
            </div>
            <CardContent className="p-3 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/IMG_5285.JPG.jpg?height=20&width=20" alt={t("community.gardeningClub")} />
                  <AvatarFallback>GC</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{t("community.gardeningClub")}</span>
                <span className="text-xs text-muted-foreground">• 2h</span>
              </div>
              <h3 className="text-base font-bold mb-1">{t("community.gardeningWorkshopTitle")}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{t("community.gardeningWorkshopDesc")}</p>
            </CardContent>
            <CardFooter className="px-3 py-2 border-t flex justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-muted-foreground">
                  <ThumbsUp className="h-3 w-3" />
                  <span className="text-xs">42</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 gap-1 text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span className="text-xs">12</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                {t("community.readMore")}
              </Button>
            </CardFooter>
          </Card>

          {/* Regular posts - more compact */}
          <div className="space-y-3">
            <CommunityPost
              community={t("community.photographyClub")}
              author="Alaa Meskioui"
              avatar="/khawla.jpeg?height=40&width=40"
              time="3h"
              content={t("community.photographyWorkshopPost")}
              images={["/pdjdp.jpeg?height=150&width=400"]}
              likes={28}
              comments={7}
            />

            {/* Sponsored post - more compact */}
            <Card className="relative overflow-hidden">
              <Badge variant="outline" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs">
                {t("community.sponsored")}
              </Badge>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/ALV.DE-78cd6600.png?height=24&width=24" alt="Saham Assurance"/>
                    <AvatarFallback>SCS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium"> Allianz</h3>
                    <p className="text-xs text-muted-foreground">{t("community.sponsored")}</p>
                  </div>
                </div>
                <p className="text-xs mb-3">{t("community.seniorCareServicesDesc")}</p>
                <div className="mb-3 rounded-md overflow-hidden border">
                  <img
                      src="/1727261166-shutterstock-624146090.jpeg?height=120&width=600"
                      alt="Senior Care Services"
                      className="w-full object-cover h-24"
                  />
                  <div className="p-2 bg-muted/30">
                    <h4 className="text-xs font-medium">{t("community.companionshipServices")}</h4>
                    <p className="text-xs text-muted-foreground">https://allianz.ma</p>
                  </div>
                </div>
                <Button size="sm" className="w-full gap-1 text-xs py-1 h-8">
                  {t("community.learnMore")}
                  <ExternalLink className="h-3 w-3"/>
                </Button>
              </CardContent>
            </Card>

            <CommunityPost
              community={t("community.historyEnthusiasts")}
              author="Zakaria Tahiri"
              avatar="/slaptop.webp?height=40&width=40"
              time={t("messages.time.yesterday")}
              content={t("community.virtualTourPost")}
              images={[]}
              likes={15}
              comments={23}
              isRecommended={true}
            />

            <CommunityPost
              community={t("community.cookingClub")}
              author="Fati Morhodi"
              avatar="/douae.jpeg?height=40&width=40"
              time="2d"
              content={t("community.cookingClassPost")}
              images={[
                "/Chicken-Tagine-4.webp?height=100&width=100",
                "/Moroccan-rice-19.jpg?height=100&width=100",
                "/moroccan-kefta-ground-meat-briouat-re..jpg?height=100&width=100",
              ]}
              likes={56}
              comments={14}
            />
          </div>
        </TabsContent>

        {/* BROWSE TAB */}
        <TabsContent value="browse" className="mt-4 space-y-6">
          {/* Suggested Communities - Swipeable */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center">
                <Sparkles className={`h-5 w-5 text-primary ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                {t("community.suggestedCommunities")}
              </h2>
              <div className="text-xs text-muted-foreground">
                {currentCommunityIndex + 1} {t("community.of")} {suggestedCommunities.length}
              </div>
            </div>

            <div className="relative">
              {/* Swipeable community card */}
              <div className="overflow-hidden">
                <motion.div
                  key={currentCommunityIndex}
                  initial={{ opacity: 0, x: dir === "rtl" ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === "rtl" ? 100 : -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <SuggestedCommunityCard {...suggestedCommunities[currentCommunityIndex]} />
                </motion.div>
              </div>

              {/* Navigation buttons */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full px-2 pointer-events-none">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full opacity-80 pointer-events-auto"
                  onClick={prevCommunity}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full opacity-80 pointer-events-auto"
                  onClick={nextCommunity}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Swipe indicator dots */}
              <div className="flex justify-center mt-3 gap-1">
                {suggestedCommunities.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentCommunityIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Swipe instruction */}
              <p className="text-xs text-center text-muted-foreground mt-2">{t("community.swipeInstruction")}</p>
            </div>
          </div>

          <Separator />

          {/* Communities You Follow */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center">
                <Users className={`h-5 w-5 text-primary ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
                {t("community.communitiesYouFollow")}
              </h2>
              <Button variant="ghost" size="sm">
                {t("community.manage")}
              </Button>
            </div>

            <div className="space-y-3">
              <FollowedCommunityCard
                name={t("community.gardeningClub")}
                description={t("community.gardeningClubDesc")}
                members={156}
                newPosts={3}
                image="/gardh.jpg?height=60&width=60"
                isActive={true}
              />

              <FollowedCommunityCard
                name={t("community.photographyClub")}
                description={t("community.photographyClubDesc")}
                members={98}
                newPosts={1}
                image="/pdjdp.jpeg?height=60&width=60"
              />

              <FollowedCommunityCard
                name={t("community.cookingClub")}
                description={t("community.cookingClubDesc")}
                members={132}
                newPosts={5}
                image="/Tagine-i.webp?height=60&width=60"
                isActive={true}
              />

              <FollowedCommunityCard
                name={t("community.historyEnthusiasts")}
                description={t("community.historyEnthusiastsDesc")}
                members={87}
                newPosts={0}
                image="/imagsandes.jpeg?height=60&width=60"
              />
            </div>
          </div>

          <Separator />

          {/* Community Categories */}
          <div>
            <h2 className="text-lg font-bold mb-3">{t("community.categories1.name")}</h2>

            <div className="grid grid-cols-2 gap-3">
              <CategoryCard
                title={t("community.categories1.knowledgeSharing")}
                icon={<BookOpen className="h-6 w-6" />}
                count={24}
                color="bg-primary/10 text-primary"
              />
              <CategoryCard
                title={t("community.categories1.creativeCorner")}
                icon={<Camera className="h-6 w-6" />}
                count={18}
                color="bg-secondary/10 text-secondary"
              />
              <CategoryCard
                title={t("community.categories1.foodRecipes")}
                icon={<Utensils className="h-6 w-6" />}
                count={15}
                color="bg-accent/10 text-accent"
              />
              <CategoryCard
                title={t("community.categories1.gardeningTips")}
                icon={<Leaf className="h-6 w-6" />}
                count={12}
                color="bg-primary/10 text-primary"
              />
              <CategoryCard
                title={t("community.categories1.successStories")}
                icon={<Award className="h-6 w-6" />}
                count={9}
                color="bg-secondary/10 text-secondary"
              />
              <CategoryCard
                title={t("community.categories1.ideasDiscussions")}
                icon={<Lightbulb className="h-6 w-6" />}
                count={21}
                color="bg-accent/10 text-accent"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CategoryCardProps {
  title: string
  icon: React.ReactNode
  count: number
  color: string
}

function CategoryCard({ title, icon, count, color }: CategoryCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="overflow-hidden hover:bg-muted/50 transition-colors cursor-pointer">
      <CardContent className="p-3 flex items-center gap-2">
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {count} {t("community.communities")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

interface CommunityPostProps {
  community: string
  author: string
  avatar: string
  time: string
  content: string
  images: string[]
  likes: number
  comments: number
  isRecommended?: boolean
}

function CommunityPost({
  community,
  author,
  avatar,
  time,
  content,
  images,
  likes,
  comments,
  isRecommended,
}: CommunityPostProps) {
  const { t, dir } = useLanguage()

  return (
    <Card>
      <CardContent className="p-3">
        {isRecommended && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>{t("community.recommendedForYou")}</span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center text-xs">
              <span className="font-medium">{author}</span>
              <span className="mx-1 text-muted-foreground">{t("community.in")}</span>
              <Badge variant="outline" className="font-normal text-xs py-0 h-5">
                {community}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
        </div>

        <p className="text-xs mb-2">{content}</p>

        {images.length === 1 ? (
          <div className="mb-2">
            <img
              src={images[0] || "/placeholder.svg"}
              alt="Post content"
              className="rounded-md w-full object-cover h-32"
            />
          </div>
        ) : images.length > 1 ? (
          <div className="grid grid-cols-3 gap-1 mb-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Post content ${index + 1}`}
                className="rounded-md aspect-square object-cover"
              />
            ))}
          </div>
        ) : null}

        <div className="flex justify-between text-muted-foreground">
          <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
            <Heart className="h-3 w-3" />
            <span className="text-xs">{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 gap-1">
            <MessageSquare className="h-3 w-3" />
            <span className="text-xs">{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Share2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Bookmark className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface SuggestedCommunityCardProps {
  name: string
  description: string
  members: number
  posts: number
  image: string
  isNew?: boolean
}

function SuggestedCommunityCard({ name, description, members, posts, image, isNew }: SuggestedCommunityCardProps) {
  const { t, dir } = useLanguage()

  return (
    <Card className="overflow-hidden hover:bg-muted/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate">{name}</h3>
              {isNew && <Badge className="bg-primary text-primary-foreground">{t("community.new")}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mt-1 mb-3">{description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Users className={`h-4 w-4 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                {members} {t("community.members")}
              </span>
              <span className="flex items-center">
                <MessageSquare className={`h-4 w-4 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                {posts} {t("community.posts")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/30">
        <Button className="w-full">{t("community.joinCommunity")}</Button>
      </CardFooter>
    </Card>
  )
}

interface FollowedCommunityCardProps {
  name: string
  description: string
  members: number
  newPosts: number
  image: string
  isActive?: boolean
}

function FollowedCommunityCard({ name, description, members, newPosts, image, isActive }: FollowedCommunityCardProps) {
  const { t, dir } = useLanguage()

  return (
    <Card
      className={`overflow-hidden hover:bg-muted/50 transition-colors cursor-pointer ${isActive ? "border-primary/50" : ""}`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate text-sm">{name}</h3>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                {isActive ? <Bell className="h-3 w-3 text-primary" /> : <BellOff className="h-3 w-3" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground truncate">{description}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                <Users className="h-3 w-3 inline mr-1" />
                {members} {t("community.members")}
              </span>
              {newPosts > 0 && (
                <Badge variant="secondary" className="text-xs py-0 h-4">
                  {newPosts} {t(newPosts === 1 ? "community.newPost" : "community.newPosts")}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button variant="ghost" className="w-full rounded-none h-8 text-xs justify-between px-4">
          <span>{t("community.viewCommunity")}</span>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

