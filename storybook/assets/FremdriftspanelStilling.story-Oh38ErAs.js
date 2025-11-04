import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-BHOx9B5b.js";import{w as m,c as A}from"./ContextDecorators-2UbCvTD3.js";import{F as N,A as v}from"./FullførtStilling-BaDOh21g.js";import{R as T}from"./GjenåpneStillingKnapp-DjtxYfqC.js";import{T as D}from"./TilgangskontrollForInnhold-vlnjPyxu.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-PdvcG0Kw.js";import"./OrganisasjonsnummerAlert-BzQj5vvO.js";import"./VStack-CmLA3gnA.js";import"./BasePrimitive-SkRKoGXq.js";import"./List-_fOxGsS0.js";import"./Link-CgwqW9aN.js";import"./KandidatHendelseTag-2_0YGvkp.js";import"./Tag-BadF4dPH.js";import"./ChatExclamationmark-8ugFK-GN.js";import"./FileXMark-BrjqZNmO.js";import"./Trash-OENCU4YY.js";import"./HandShakeHeart-vBuPvVGQ.js";import"./Calendar-DuWWARUT.js";import"./ThumbUp-B_hDBLiw.js";import"./Table-ClzuaGNZ.js";import"./util-DmSLrwrq.js";import"./parse-Dyx89_Ry.js";import"./getDefaultOptions-DwRyr_Q7.js";import"./parseISO-CqNQisVW.js";import"./index-C3Kl7Ykz.js";import"./index-B40KJ5b4.js";import"./isBefore-CVE6uPQu.js";import"./util-BeBCU710.js";import"./accordion-Clzhr09L.js";import"./index-ChqHN0J8.js";import"./index-BRQ7dQBC.js";import"./index-X33zak3A.js";import"./ChevronDown-tvniP40I.js";import"./Box-B9VYVBd5.js";import"./Bell-3lTCa3Hm.js";import"./PersonChat-Djq0Wypa.js";import"./Eye-Eq9mQBvn.js";import"./ProgressBar-Bno6lsdK.js";import"./EyeSlash-DA2AVEXW.js";import"./CircleSlash-CClKArLN.js";import"./Modal-B79dH_YT.js";import"./floating-ui.react-C7cTNDuv.js";import"./Date.Input-BAjUfhRV.js";import"./useFormField-DtUBbpyB.js";import"./useControllableState-CMMk7b1o.js";import"./Modal.context-V4MFRuxC.js";import"./Checkbox-zPPJrpMs.js";import"./Fieldset-DLI0ZTq7.js";import"./Pencil-CUfiB_cj.js";import"./PersonbrukerTekst-B2qeIW3K.js";import"./ClockDashed-DtNF24X4.js";import"./Tasklist-BgeAfib4.js";import"./ErrorBoundary-DRhCzW1A.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
