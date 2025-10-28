import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-Dc4kNGne.js";import{w as m,c as D}from"./ContextDecorators-CkB1BqmA.js";import{F as N,A as v}from"./FullførtStilling-D4XfSQC1.js";import{R as T}from"./GjenåpneStillingKnapp-DpPFgIuJ.js";import{T as A}from"./TilgangskontrollForInnhold-QTQLk37M.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BD9hT32I.js";import"./OrganisasjonsnummerAlert-BdUwOAPw.js";import"./VStack-CAyaVyw0.js";import"./BasePrimitive-D4zqyJIf.js";import"./List-Dyxs_JCW.js";import"./Link-C_rbyaAd.js";import"./KandidatHendelseTag-PnBwwGp6.js";import"./Tag-B8f9oEtQ.js";import"./ChatExclamationmark-CAfBq3z7.js";import"./FileXMark-DqPsfHxv.js";import"./Trash-CcVYippy.js";import"./HandShakeHeart-3qVuOYbM.js";import"./Calendar-BPwIt6xQ.js";import"./ThumbUp-DVMCkmxK.js";import"./Table-DICHcfDi.js";import"./util-DybQ6GFM.js";import"./format-Dy54t0JC.js";import"./match-DW3BXZFb.js";import"./parse-BVEnNKgt.js";import"./getDefaultOptions-B3ByGOpu.js";import"./parseISO-CGoO-hx7.js";import"./index-B0NViYym.js";import"./index-B40KJ5b4.js";import"./isBefore-1PECHI9n.js";import"./util-CR9k7jeF.js";import"./accordion-BO3tL1LV.js";import"./index-CdnlMkA0.js";import"./index-CMr7-12w.js";import"./index-CuQFR3Pt.js";import"./ChevronDown-DN-Romwj.js";import"./Box-BfKsKS42.js";import"./Bell-CaHdjywn.js";import"./PersonChat-CuhGzNao.js";import"./Eye-CuM_uGKZ.js";import"./ProgressBar-eLUefMkn.js";import"./EyeSlash-DUxDcb1h.js";import"./CircleSlash-CQCxalbX.js";import"./Modal-CqqD7Geb.js";import"./floating-ui.react-yYtpfu_G.js";import"./Date.Input-BWsdgrzB.js";import"./useFormField-HIpxu0nw.js";import"./useControllableState-idObFdbI.js";import"./Modal.context-D4sW2lKa.js";import"./Checkbox-CJzgGdIi.js";import"./Fieldset-BoNjHA8N.js";import"./Pencil-a34C9K8N.js";import"./PersonbrukerTekst-tYLSOsnR.js";import"./ClockDashed-RnQT52w0.js";import"./Tasklist-LaN6yHsI.js";import"./ErrorBoundary-C1G3rABv.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
