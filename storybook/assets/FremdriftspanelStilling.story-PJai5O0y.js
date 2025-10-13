import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-CgpsV_Wu.js";import{w as m,c as D}from"./ContextDecorators-DChxsmLa.js";import{K as b}from"./schema.zod-7WBP8_HQ.js";import{u as _}from"./useKandidatlisteForEier-Bt_jObky.js";import{F as y,A as N}from"./FullførtStilling-DGMiJVa_.js";import{R as T}from"./GjenåpneStillingKnapp-B0UZGXRN.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Cv2y7dQY.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C_fgEUb0.js";import"./OrganisasjonsnummerAlert-Bhx4nxvy.js";import"./VStack-DlX7_wSI.js";import"./BasePrimitive-DnTZQNYl.js";import"./List-VI7Q0s2V.js";import"./Link-BDVHruia.js";import"./KandidatHendelseTag-BD3eADfS.js";import"./Tag-C37VkUMh.js";import"./FileXMark-B7ZDcxhz.js";import"./Trash-C31SSF9P.js";import"./HandShakeHeart-vrKMCZxi.js";import"./Calendar-DhK1AGOB.js";import"./ThumbUp-CBRf_sJN.js";import"./Table-D1lgSz1-.js";import"./util-2ZMmUiey.js";import"./format-B58jIAnh.js";import"./match-fCXOdtfI.js";import"./parseISO-BOwU1sGN.js";import"./parse-D2-UF7KL.js";import"./getDefaultOptions-ClMb8y5B.js";import"./util-WBelmkEa.js";import"./kandidat.mock-CeXUf8Lo.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DhQAgLOj.js";import"./index-BfRlWrt7.js";import"./index-DmPhKyYB.js";import"./index-COhhpekK.js";import"./ChevronDown-xqq8YiUn.js";import"./Box-DPMEklOc.js";import"./Bell-BTlVLJFk.js";import"./PersonChat-BXkZ_SET.js";import"./Eye-u6vW-rvn.js";import"./ProgressBar-D_dwgxUP.js";import"./oppdaterStilling-C2GJ1rlM.js";import"./EyeSlash-CKQUWkkv.js";import"./CircleSlash-14vQWRn_.js";import"./Modal-CEWB9pMp.js";import"./floating-ui.react-CIjUBrgT.js";import"./Date.Input-C8sZDZm4.js";import"./useFormField-DliOPgKb.js";import"./useControllableState-BTYG4yPg.js";import"./Modal.context-BRVM-1Ki.js";import"./Checkbox-CXCmzQDs.js";import"./Fieldset-BxRCskb-.js";import"./Pencil-Bl76_Qub.js";import"./PersonbrukerTekst-BGKGODQ9.js";import"./ClockDashed-2aK2gqjx.js";import"./Tasklist-35DZtoxN.js";import"./ErrorBoundary-CKfl8opT.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
