import{at as I,I as w,j as t,R as k,S as j,cs as x,cB as b,cA as g,ct as u,N as y,cU as N}from"./iframe-D9qA_9GD.js";import{w as m,c as D}from"./ContextDecorators-CUV7kzNL.js";import{F as _,A as v}from"./FullførtStilling-cnD6G1uh.js";import{R as T}from"./GjenåpneStillingKnapp-1uIaNlta.js";import{T as A}from"./TilgangskontrollForInnhold-ChxEsZPm.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C_BO5PDv.js";import"./OrganisasjonsnummerAlert-EKu8OGew.js";import"./VStack-F9byACb6.js";import"./BasePrimitive-BTVpI0SI.js";import"./Box-BQY138F7.js";import"./List-DC6PMjkG.js";import"./Link-CoHpPI50.js";import"./KandidatHendelseTag-Di8dUZOx.js";import"./Tag-DTbGS8uf.js";import"./ChatExclamationmark-D5TWuosh.js";import"./FileXMark-DvRu4AlR.js";import"./Trash-K0ldOWId.js";import"./HandShakeHeart-Dn0qVttd.js";import"./Calendar-Brz02_Oy.js";import"./ThumbUp-CmCH1kLN.js";import"./ExclamationmarkTriangle-C-9Ff1cH.js";import"./Table-8iZyNf9F.js";import"./index-DsbKVEBS.js";import"./index-B40KJ5b4.js";import"./util-LuhOfgaI.js";import"./DatoVelger-DxPEM6QC.js";import"./useDatepicker-C8-OfHMU.js";import"./useControllableState-BQN1ohGC.js";import"./Modal-D9imXltG.js";import"./floating-ui.react-CBDWNK4Z.js";import"./useFormField-gLsBXw0o.js";import"./ReadMore-Dwl8UzRp.js";import"./ChevronDown-jYQYWyfv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-GzQGtyHt.js";import"./Modal.context-B_18zVZi.js";import"./Popover-DEBgH9We.js";import"./DismissableLayer-C12o3Eot.js";import"./startOfMonth-DCJIIdga.js";import"./Select-D_AtIL_B.js";import"./endOfMonth-CkpOqOtP.js";import"./ArrowLeft-DEcvzrxM.js";import"./ArrowRight-CQYPChXR.js";import"./isSameDay-BfwLCLHO.js";import"./Checkbox-vICbI3C5.js";import"./Fieldset-eeAFXZXM.js";import"./accordion-BiRvoV17.js";import"./index-PSP8iITd.js";import"./index-ChSx-o3p.js";import"./index-Tj08a4qb.js";import"./ProgressBar-CJpX_knu.js";import"./useValueAsRef-Bh2wHF7G.js";import"./Bell-CKcDBSZa.js";import"./PersonChat-CBs-k3bA.js";import"./Eye-IaVym6tW.js";import"./ShieldLock-BhwcYlFK.js";import"./PadlockLocked-DQkoxOLE.js";import"./EyeSlash-BH5FyTZf.js";import"./CircleSlash-BcO5s98Y.js";import"./Pencil-B12-p5lM.js";import"./FullførStillingModal-CPkFKjnG.js";import"./PersonbrukerTekst-C_Hv65yC.js";import"./ClockDashed-CapNv7YT.js";import"./IkonNavnAvatar-BDj2P62r.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CTT_pK_Z.js";import"./ErrorBoundary-DZrHOe54.js";function s({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(n=>n.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(n=>n.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(n=>n.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}s.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:s},o={render:()=>m(()=>t.jsx(s,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(s,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(s,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(s,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
