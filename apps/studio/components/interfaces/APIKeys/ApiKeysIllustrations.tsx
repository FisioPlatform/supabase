import { ExternalLink, Github } from 'lucide-react'

import { LOCAL_STORAGE_KEYS } from 'common'
import { FeatureBanner } from 'components/ui/FeatureBanner'
import { APIKeysData } from 'data/api-keys/api-keys-query'
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'ui'
import { ApiKeyPill } from './ApiKeyPill'
import { CreateNewAPIKeysButton } from './CreateNewAPIKeysButton'
import { useApiKeysVisibility } from './hooks/useApiKeysVisibility'

// Mock API Keys for demo
const mockApiKeys = [
  {
    id: 'mock-id-1',
    type: 'secret',
    api_key: 'sb_secret_8I4Se•••••••••••••',
    description: 'New Key',
  },
  {
    id: 'mock-id-2',
    type: 'secret',
    api_key: 'sb_secret_pL9Tz•••••••••••••',
    description: 'Service Key',
  },
  {
    id: 'mock-id-3',
    type: 'secret',
    api_key: 'sb_secret_bR7Ax•••••••••••••',
    description: 'Backend Key',
  },
] as Extract<APIKeysData[number], { type: 'secret' | 'publishable' }>[]

/**
 * Reusable table illustration component
 */
export const ApiKeysTableIllustration = () => {
  return (
    <Card className="w-full overflow-hidden opacity-60 pointer-events-none bg-surface-100">
      <CardContent className="p-0">
        <Table className="p-5">
          <TableHeader>
            <TableRow className="bg-200">
              <TableHead
                key=""
                className="text-left font-mono uppercase text-xs text-foreground-lighter h-auto py-2 overflow-hidden w-[180px]"
              >
                Name
              </TableHead>
              <TableHead className="text-left font-mono uppercase text-xs text-foreground-lighter h-auto py-2 pr-0">
                API Key
              </TableHead>
              <TableHead
                className="text-right font-mono uppercase text-xs text-foreground-lighter h-auto py-2"
                key="actions"
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockApiKeys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="py-2 w-[180px]">{apiKey.description}</TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-row gap-2">
                    <ApiKeyPill apiKey={apiKey} />
                  </div>
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/**
 * Reusable illustration with gradient overlay component
 */
export const ApiKeysIllustrationWithOverlay = () => {
  return (
    <>
      {/* Gradient overlay - horizontal on desktop, vertical on mobile */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 xl:h-full xl:inset-x-auto xl:-right-16 xl:top-3 w-full xl:w-2/3 
        bg-gradient-to-t xl:bg-gradient-to-l 
        from-background-alternative via-background-alternative/90 via-[5%] to-transparent 
        z-[3] pointer-events-none xl:max-w-[500px]"
      />

      <div className="absolute scale-100 left-10 -bottom-14 w-[720px] xl:w-[500px] xl:left-auto xl:-right-[200px] 2xl:-right-16 xl:top-[21px] xl:scale-75">
        <ApiKeysTableIllustration />
      </div>
    </>
  )
}

/**
 * "Coming Soon" banner for users who don't have the feature flag enabled
 */
export const ApiKeysComingSoonBanner = () => {
  return (
    <FeatureBanner illustration={<ApiKeysIllustrationWithOverlay />} bgAlt>
      <div className="flex flex-col gap-0 z-[2]">
        <p className="text-sm text-foreground">New API keys are coming soon</p>
        <p className="text-sm text-foreground-lighter lg:max-w-sm 2xl:max-w-none">
          We're rolling out new API keys to better support your application needs.
        </p>
        <div className="mt-4">
          <Button type="default" icon={<Github />}>
            Learn more
          </Button>
        </div>
      </div>
    </FeatureBanner>
  )
}

/**
 * Create API Keys callout for users who have the feature flag enabled but no keys yet
 */
export const ApiKeysCreateCallout = () => {
  const { canInitApiKeys } = useApiKeysVisibility()

  if (!canInitApiKeys) return null

  return (
    <FeatureBanner illustration={<ApiKeysIllustrationWithOverlay />} bgAlt>
      <div className="flex flex-col gap-0 z-[2]">
        <p className="text-sm text-foreground">Create your new API keys</p>
        <p className="text-sm text-foreground-lighter lg:max-w-sm 2xl:max-w-none">
          Generate new API keys to use with your application.
        </p>
        <div className="mt-4">
          <CreateNewAPIKeysButton />
        </div>
      </div>
    </FeatureBanner>
  )
}

/**
 * Feedback banner for users who have API keys and the feature is rolled out to them
 */
export const ApiKeysFeedbackBanner = () => {
  const { hasApiKeys, isInRollout } = useApiKeysVisibility()

  // Don't show anything if not in rollout or if keys don't exist
  if (!isInRollout || !hasApiKeys) {
    return null
  }

  return (
    <FeatureBanner
      storageKey={LOCAL_STORAGE_KEYS.API_KEYS_FEEDBACK_DISMISSED}
      className="!p-6"
      dismissable
    >
      <div className="flex flex-col gap-0 z-[2]">
        <p className="text-sm text-foreground">Your new API keys are here</p>
        <p className="text-sm text-foreground-lighter">
          We've updated our API keys to better support your application needs. Have feedback?{' '}
          <a
            href="https://github.com/supabase/supabase/discussions"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-brand"
          >
            Join the discussion on GitHub <ExternalLink size={14} strokeWidth={1.5} />
          </a>
        </p>
      </div>
    </FeatureBanner>
  )
}
